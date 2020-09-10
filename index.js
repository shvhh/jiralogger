const logToJira = require('./logToJira');
const csvParser = require('./csvParse');
const downloadCsv = require('./downloadCsv');
const fs = require('fs');
const jiraEmail = 'hemant.rajpoot@unthinkable.co';
const jiraPassword = '*******************';

const clockifyEmail = 'hemant.rajpoot@unthinkable.co';
const clockifyPassword = '*******************';
const clockifyUserId = '5f32d3ffd0dc713d6a104e9a';

(async () => {
    await downloadCsv({
        clockifyEmail,
        clockifyPassword,
        usersId: clockifyUserId,
    });

    const csvFile = fs
        .readdirSync('.')
        .find((filename) => filename.endsWith('.csv'));

    const csvData = csvParser(csvFile).map(({ Description, ...workEntry }) => ({
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

    for (i = 0; i < csvData.length; i++) {
        await logToJira(csvData[i]);
    }

    fs.unlinkSync(csvFile);
})();
