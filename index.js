const {
    JIRA_EMAIL,
    JIRA_PASSWORD,
    CLOCKIFY_EMAIL,
    CLOCKIFY_PASSWORD,
    CLOCKIFY_USERID,
    FIRST_NAME,
    SLACK_HOOK_PATH,
    GMAIL_ID,
    GMAIL_PASSWORD,
} = require('dotenv').config().parsed;
const fs = require('fs');
const logToJira = require('./logToJira');
const csvParser = require('./csvParse');
const downloadCsv = require('./downloadCsv');
const sendToSlack = require('./sendToSlack');
const sendMail = require('./sendToGmail');
const jiraEmail = JIRA_EMAIL;
const jiraPassword = JIRA_PASSWORD;

const clockifyEmail = CLOCKIFY_EMAIL;
const clockifyPassword = CLOCKIFY_PASSWORD;
const clockifyUserId = CLOCKIFY_USERID;

function log() {
    const consoleLog = console.log;
    return function () {
        let err = new Error();
        err = err.stack.split('\n')[2].split(' ').pop();
        consoleLog(err.substring(err.indexOf('/'), err.lastIndexOf(':')));
        consoleLog(...arguments);
    };
}
console.log = log();

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

    const csvData = csvRaw.map(({ Description, ...workEntry }, i) => ({
        taskId: Description.substring(
            Description.indexOf('[') + 1,
            Description.indexOf(']')
        ),
        jiraEmail,
        jiraPassword,
        startDate: workEntry['Start Date'],
        startTime: workEntry['Start Time'],
        duration: workEntry['Duration (h)'],
        title: Description,
        index: i,
    }));

    const csvDataWithPercentage = await Promise.all(
        csvData.map((workEntry) => logToJira(workEntry))
    );

    const slackUniqueTaskList = await sendToSlack(
        csvDataWithPercentage,
        FIRST_NAME,
        SLACK_HOOK_PATH
    );

    await sendMail(slackUniqueTaskList, GMAIL_ID, GMAIL_PASSWORD);
    fs.unlinkSync(csvFile);
})();
