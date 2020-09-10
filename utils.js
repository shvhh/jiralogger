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
module.exports = { request };
