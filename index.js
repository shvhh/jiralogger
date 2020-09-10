const {
    JIRA_EMAIL,
    JIRA_PASSWORD,
    CLOCKIFY_EMAIL,
    CLOCKIFY_PASSWORD,
    CLOCKIFY_USERID,
    FIRST_NAME,
    SLACK_HOOK_PATH,
} = require('dotenv').config().parsed;
const fs = require('fs');
const logToJira = require('./logToJira');
const csvParser = require('./csvParse');
const downloadCsv = require('./downloadCsv');
const sendToSlack = require('./sendToSlack');
const pass = require('./password.js');

const jiraEmail = JIRA_EMAIL;
const jiraPassword = JIRA_PASSWORD;

const clockifyEmail = CLOCKIFY_EMAIL;
const clockifyPassword = CLOCKIFY_PASSWORD;
const clockifyUserId = CLOCKIFY_USERID;

(async () => {
    await downloadCsv({
        clockifyEmail,
        clockifyPassword,
        usersId: clockifyUserId,
    });

    const csvFile = fs
        .readdirSync('.')
        .find((filename) => filename.endsWith('.csv'));
    const csvRaw = csvParser(csvFile);

    const csvDataForSlack = csvRaw.map((workEntry, i) => ({
        title: workEntry.Description,
        duration: workEntry['Duration (h)'],
        index: i,
    }));

    const csvDataForJira = csvRaw.map(({ Description, ...workEntry }) => ({
        taskId: Description.substring(
            Description.indexOf('[') + 1,
            Description.indexOf(']')
        ),
        jiraEmail,
        jiraPassword,
        startDate: workEntry['Start Date'],
        startTime: workEntry['Start Time'],
        duration: workEntry['Duration (h)'],
    }));

    await sendToSlack(csvDataForSlack, FIRST_NAME, SLACK_HOOK_PATH);

    for (i = 0; i < csvDataForJira.length; i++) {
        await logToJira(csvDataForJira[i]);
        console.log(
            `${csvDataForJira[i].duration} logged in ${csvDataForJira[i].taskId} At ${csvDataForJira[i].startTime}`
        );
    }

    fs.unlinkSync(csvFile);
})();
