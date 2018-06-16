/**********************************************************
 * 
 **********************************************************/
const http = require('http');
const async = require('async');
const url = process.argv[2];
var lastPackOfData = '';
var iteration = 0;

const test = function () {
    if (lastPackOfData !== 'meerkat') return true;
    else return false;
};

const httpGetRequest = function (manager) {
    // console.log('WHAT ARE YOU DOING?');
    http.get(url, function (response) {
        let dataCollector = '';
        response.setEncoding('utf8');
        response.on('data', function (data) {
            dataCollector += data;
        });
        response.on('end', function () {
            // console.log('PRINT STUFF: == ' + dataCollector);
            // console.log('PRINT STUFF: == ' + iteration);
            lastPackOfData = dataCollector;
            iteration++;
            manager(null, iteration);
        });
        response.on('error', function (err) {
            manager(err, null);
        });
    });
};

const print = function (err, results) {
    if (err) console.log(err);
    else console.log(results);
};

async.whilst(test, httpGetRequest, print);