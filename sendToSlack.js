// https://hooks.slack.com/services/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
const { request, sumTime, durationFormatter } = require('./utils');

const textWidth = require('string-pixel-width');

function formatText({ title, duration, index }, font) {
    const diff = 6000 - textWidth(` ${index}. ${title}${duration}`, { font });
    if (diff > 26) {
        return ` ${index + 1}. ${title}${' '.repeat(
            Math.round(diff / 26)
        )}${duration}`;
    }
    return `    ${index + 1}. ${title} ${duration}`;
}

async function sendToSlack(array, firstName, path) {
    let str = `Hello Team,\nPlease find ${firstName}'s today's status (${new Date().toLocaleDateString(
        'en-IN',
        { year: 'numeric', month: 'long', day: 'numeric' }
    )}).\n`;

    slackUniqueTaskObject = {};

    array.forEach((workentry) => {
        const { title } = workentry;
        if (slackUniqueTaskObject[title]) {
            slackUniqueTaskObject[title] = {
                ...slackUniqueTaskObject[title],
                duration: sumTime(
                    slackUniqueTaskObject[title].duration,
                    workentry.duration
                ),
            };
        } else {
            workentry.duration = sumTime(workentry.duration);
            slackUniqueTaskObject[title] = workentry;
        }
    });
    const slackUniqueTaskList = Object.values(slackUniqueTaskObject).map(
        (workentry, index) => {
            const duration = durationFormatter(workentry.duration);
            workentry = { ...workentry, index ,duration};

            str +=
                formatText({ ...workentry, index }, 'open sans', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }) + '\n';

            return workentry;
        }
    );
    await request({
        hostname: 'hooks.slack.com',
        path,
        method: 'post',
        data: { text: str },
    })
        .then(console.log)
        .catch(console.log);
    return slackUniqueTaskList;
}

module.exports = sendToSlack;
