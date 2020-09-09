const puppeteer = require('puppeteer-extra');
const fs = require('fs');
const path = require('path');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());

const ArrowLeft = 'ArrowLeft';
const ArrowRight = 'ArrowRight';

async function logToJira({
    taskId,
    jiraEmail,
    jiraPassword,
    startDate,
    startTime,
    duration,
}) {
    const browser = await puppeteer.launch({
        headless: false,
        timeout: 0,
    });

    const page = await browser.newPage();
    await page.goto(`https://fabulate.atlassian.net/browse/${taskId}`, {
        timeout: 0,
        waitUntil: 'networkidle2',
    });

    await page.waitForSelector(`#username`);
    await page.type(`#username`, jiraEmail, {
        delay: 15,
    });
    await page.keyboard.press('Enter');
    await delay(2);
    await page.type(`#password`, jiraPassword, {
        delay: 15,
    });
    await page.keyboard.press('Enter');
    await delay(100);

    await page.click('.sc-iIHSe.fLgmPq', { delay: 15 });
    await page.waitForSelector('.Input__InputElement-sc-1o6bj35-0.bfCuIo', {
        visible: true,
        timeout: 0,
    });
    await setDuration(duration, page);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await SetDate(startDate, page);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await setTime(startTime, page);
    await page.keyboard.press('Enter');
    await page.click('button.css-1yx6h60');
    delay(15);
    await browser.close();
}
function delay(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000 * sec);
    });
}

async function setTime(startTime, page) {
    await page.keyboard.type(
        (startTime.substr(0, 5) + startTime.substr(-2)).toLowerCase()
    );
}
async function SetDate(startDate, page) {
    let dayDiffrences = Math.floor(
        (new Date(new Date().toISOString().split('T').shift()).getTime() -
            new Date(startDate).getTime()) /
            86400000
    );

    let cursorToMove;
    if (dayDiffrences < 0) {
        cursorToMove = ArrowRight;
        dayDiffrences *= -1;
    } else {
        cursorToMove = ArrowLeft;
    }
    while (dayDiffrences) {
        await page.keyboard.press(cursorToMove);
        dayDiffrences -= 1;
    }
}

async function setDuration(duration, page) {
    duration = duration.split(':');
    await page.type(
        `.Input__InputElement-sc-1o6bj35-0.bfCuIo`,
        `${duration[0]}h ${duration[1]}m`,
        {
            delay: 15,
        }
    );
}

module.exports = logToJira;
