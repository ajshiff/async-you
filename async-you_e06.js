/**********************************************************
 * REDUCE
 **********************************************************/
const http = require('http');
const async = require('async');
const url = process.argv[2];
const dataPacket = ['one', 'two', 'three'];

// console.log(url);

const httpGetRequest = function (query, manager) {
    query = url + '?' + query;
    // console.log(query);
    http.get(query, function (response) {
        let dataCollector = '';
        response.setEncoding('utf8');
        response.on('data', function (data) {
            // console.log(data);
            dataCollector += data;
        });
        response.on('end', function () {
            // console.log(dataCollector);
            manager(null, dataCollector);
        });
    });
};

const printResults = function (err, results) {
    if (err) console.error(err);
    else console.log(results);
};

async.reduce(dataPacket, httpGetRequest, printResults);