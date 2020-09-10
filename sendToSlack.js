// https://hooks.slack.com/services/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
const { request } = require('./utils');

const textWidth = require('string-pixel-width');

function formatText({ title, duration, index }, font) {
    const durationSplit = duration.split(':');
    duration = `${durationSplit[0]}h ${durationSplit[1]}m`;
    const diff = 6000 - textWidth(` ${index}. ${title}${duration}`, { font });
    // console.log(diff);
    if (diff > 26) {
        return ` ${index + 1}. ${title}${' '.repeat(
            Math.round(diff / 26)
        )}${duration}`;
    }
    return `    ${index + 1}. ${title} ${duration}`;
}

async function sendToSlack(array, firstName,path) {
    let str = `Hello Team,\nPlease find ${firstName}'s today's status (${new Date().toLocaleDateString(
        'en-IN',
        { year: 'numeric', month: 'long', day: 'numeric' }
    )}).\n`;
    array.forEach((workentry) => {
        str +=
            formatText(workentry, 'open sans', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }) + '\n';
    });
    await request({
        hostname: 'hooks.slack.com',
        path,
        method: 'post',
        data: { text: str },
    })
        .then(console.log)
        .catch(console.log);
}

module.exports = sendToSlack;
