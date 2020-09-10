const puppeteer = require('puppeteer-extra');
const fs = require('fs');
const path = require('path');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());
puppeteer.use(
    require('puppeteer-extra-plugin-user-preferences')({
        userPrefs: {
            download: {
                prompt_for_download: false,
                default_directory: __dirname,
            },
        },
    })
);
//userId = 5f32d3ffd0dc713d6a104e9a;
async function downloadCsv({ clockifyEmail, clockifyPassword, usersId }) {
    const browser = await puppeteer.launch({
        headless: false,
        timeout: 0,
    });

    const page = await browser.newPage();
    await page.goto(`https://clockify.me/login`, {
        timeout: 0,
        waitUntil: 'networkidle2',
    });

    await page.waitForSelector(`#email`);
    await page.type(`#email`, clockifyEmail, {
        delay: 15,
    });
    await page.type(`#password`, clockifyPassword, {
        delay: 15,
    });
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    await page.goto(
        `https://clockify.me/reports/detailed?start=${new Date(
            new Date().toISOString().split('T').shift()
        ).toISOString()}&end=${new Date(
            new Date().addDays(1).toISOString().split('T').shift()
        ).toISOString()}&filterValuesData=%7B"users":%5B"${usersId}"%5D%7D&filterOptions=%7B"userAndGroup":%7B"status":"ACTIVE"%7D%7D&page=1&pageSize=50`,
        {
            timeout: 0,
            waitUntil: 'networkidle0',
        }
    );
    // await delay(100);

    await page.click(
        'div.cl-component-divided-left.pointer.cl-remove-divider-mob.cl-dropdown-toggle.cl-small',
        { delay: 15 }
    );
    await page.click(
        'div.cl-dropdown-menu.ng-star-inserted > div.cl-scroll-area > a.cl-dropdown-item:nth-child(2)',
        { delay: 15 }
    );

    await delay(6);
    await browser.close();
}

function delay(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000 * sec);
    });
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

module.exports = downloadCsv;
