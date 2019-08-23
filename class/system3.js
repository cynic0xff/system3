const csv = require('csv-parser');
const fs = require('fs');
const Config = require('./config.js')

class System3 {
    constructor(srcFile) {
        this.srcFile = srcFile;

        console.log(this.srcFile);
    }

    run() {
        fs.createReadStream(this.srcFile)
        .pipe(csv())
        .on('data', (row) => {
            //console.log(row);
            this.process(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });
    }

    process(row) {
        console.log(row['first_name']);
    }
};

module.exports = System3;
