/**********************************************************
 * WATERFALL
 **********************************************************/
const async = require('async');
const http = require('http');
const fs = require('fs');
const filepath = process.argv[2];

function callback(err, result) {}

async.waterfall([
    let url = fs.createReadStream(filepath),
        // console.log(url),
        http.get(url, function (response) {
            let datacollector = '';
            response.setEncoding('utf8').on('data', function (data) {})
        });
], callback());