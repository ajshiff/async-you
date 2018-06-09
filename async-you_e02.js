/**********************************************************
 * SERIES OBJECT
 **********************************************************/
// INITIALIZE LIBRARIES, DECLARE GLOBAL VARIABLES
const async = require('async');
const http = require('http');
const fs = require('fs');
const url1 = process.argv[2];
const url2 = process.argv[3];

// HTTP.GET ASYNC FUNCTION
const httpGetFrom = function (url, manager) {
    http.get(url, function (response) {
        var dataCollector = '';
        response.setEncoding('utf8').on('data', function (data) {
            dataCollector += data;
        });
        response.on('end', function () {
            //console.log(dataCollector)
            manager(null, dataCollector);
        });
    });
};

const printResults = function (results) {
    console.log(results);
};

async.series({
    requestOne: httpGetFrom(url1),
    requestTwo: httpGetFrom(url2)
}, printResults);