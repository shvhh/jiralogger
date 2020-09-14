const https = require('https');

function request({ hostname, path, method, data }) {
    return new Promise((resolve, reject) => {
        data = JSON.stringify(data);

        const options = {
            hostname,
            port: 443,
            path,
            method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
            },
        };
        let str = '';
        const req = https.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`);

            res.on('data', (d) => {
                str += d;
            });
            res.on('end', () => {
                resolve(str);
            });
        });

        req.on('error', reject);

        req.write(data);
        req.end();
    });
}



// sendMail();

function sumTime(time1, time2 = '') {
    const t1 = time1.split(':');
    const t2 = time2.split(':');
    for (let i = 0; i < t1.length; i++) {
        t1[i] = (parseInt(t1[i]) || 0) + (parseInt(t2[i]) || 0);
    }
    return t1.join(':');
}

function durationFormatter(duration) {
    const durationSplit = duration.split(':');
    return `${
        parseInt(durationSplit[0]) ? parseInt(durationSplit[0]) + 'h ' : ' '
    }${parseInt(durationSplit[1]) ? parseInt(durationSplit[1]) + 'm ' : ' '}`;
}
module.exports = { request, sumTime, durationFormatter };
