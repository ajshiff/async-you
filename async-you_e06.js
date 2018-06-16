/**********************************************************
 * REDUCE
 **********************************************************/
const http = require('http');
const async = require('async');
const url = process.argv[2];
const dataPacket = ['one', 'two', 'three'];

const httpGetRequest = function (memo, query, manager) {
    query = url + '?number=' + query;
    http.get(query, function (response) {
        let dataCollector = '';
        response.setEncoding('utf8');
        response.on('data', function (data) {
            dataCollector += data;
        });
        response.on('end', function () {
            memo += parseInt(dataCollector, 10);
            manager(null, memo);
        });
    });
};

const printResults = function (err, results) {
    if (err) console.error(err);
    else console.log(results);
};

async.reduce(dataPacket, 0, httpGetRequest, printResults);