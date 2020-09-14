const puppeteer = require('puppeteer-extra');
const fs = require('fs');
const path = require('path');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());

const ArrowLeft = 'ArrowLeft';
const ArrowRight = 'ArrowRight';

async function logToJira(logEntry) {
    let {
        taskId,
        jiraEmail,
        jiraPassword,
        startDate,
        startTime,
        duration,
        index,
    } = logEntry;
    await delay(index * 30);
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
    await page.waitForSelector('#password');
    await delay(5);
    await page.waitForSelector('#password');
    await page.type(`#password`, jiraPassword, {
        delay: 15,
    });
    await page.keyboard.press('Enter');
    await page.waitForSelector('p', {
        timeout: 0,
    });

    console.log('loging in');
    await delay(60);
    console.log('logged in');
    await page.waitForSelector(
        '.Content__ChildWrapper-ve26fj-0.ilJUcG > div > div > div > div > small',
        {
            timeout: 0,
        }
    );
    // document.querySelector(".sc-dDojKJ.dfMBMz > div > div").click() for open status drop down
    await page.click(
        '.Content__ChildWrapper-ve26fj-0.ilJUcG > div > div > div > div > small',
        { delay: 15 }
    );
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

    const estimatedTime = await getEstimatedDurationInMinutes(page);
    const spendTime = await getPreviouslyLoggedDurationInMinutes(page);

    alreadyLoggedTime = await delay(15);
    await browser.close();
    let percentage = (spendTime / estimatedTime) * 100;
    let status = null;
    if (percentage > 100) {
        percentage = 100;
        status = 'TO TEST';
    } else {
        status = 'IN PROGRESS';
        percentage = Math.floor(percentage);
    }

    return { ...logEntry, percentage,status };
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

async function getEstimatedDurationInMinutes(page) {
    const element = await page.$('.sc-hokXgN.ctXTTT > .sc-kvZOFW');
    let estimation = await page.evaluate((el) => el && el.textContent, element);
    let estimationInMin = estimation && estimation * 60;
    return estimationInMin;
}

async function getPreviouslyLoggedDurationInMinutes(page) {
    const element = await page.$('.css-1ge7qzd.e1rcei0k3');

    let loggedTime = await page.evaluate((el) => el && el.textContent, element);
    if (loggedTime) {
        loggedTime = loggedTime.split('m logged').shift().split(' ');

        loggedTimeInMinutes = loggedTime.reduce((acc, curr) => {
            if (curr.includes('h')) {
                return parseInt(curr) * 60 + acc;
            } else if (curr.includes('d')) {
                return parseInt(curr) * 480 + acc;
            }
            return parseInt(curr) + acc;
        }, 0);
        return loggedTimeInMinutes;
    }
    return 0;
}

module.exports = logToJira;
