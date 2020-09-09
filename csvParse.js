const fs = require('fs');
const parse = require('csv-parse/lib/sync');

function parseCsv(filePath) {
    const csvData = fs.readFileSync(filePath).toString();
    const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true,
    });
    return records;
}
module.exports = parseCsv;
