const logToJira = require('./logToJira');
const csvParser = require('./csvParse');

const jiraEmail = 'hemant.rajpoot@unthinkable.co';
const jiraPassword = '*******************';
const csvData = csvParser(
    './Clockify_Detailed_Report_09_09_2020-09_09_2020.csv'
).map(({ Description, ...workEntry }) => ({
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
console.log(csvData)
(async () => {
    for (i = 0; i < csvData.length; i++) {
        await logToJira(csvData[i]);
    }
})();
