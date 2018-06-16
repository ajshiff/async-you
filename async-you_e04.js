/**********************************************************
 * ASYNC MAP
 * map runs all processes in parallel. Whatever reponse it
 * gives to the callback/manager, is saved and given to the
 * final function. map runs all processes in parallel.
 **********************************************************/

// DECLARE CONSTANT VARIABLES AND INCLUDE LIBRARIES
const http = require('http');
const async = require('async');
const urls = [process.argv[2], process.argv[3]];

// FUNCTION TO MAKE GET REQUEST AND HANDLE ERRoRs
const httpGetRequest = function (url, manager) {
    http.get(url, function (response) {
        let dataCollector = '';
        response.setEncoding('utf8').on('data', function (data) {
            dataCollector += data;
        });
        response.on('end', function () {
            manager(null, dataCollector);
        });
    }).on('error', function (err) {
        manager(err);
    });
};
// THE FUNCTION THAT RUNS AFTER ALL HTTP MAP REQUESTS ARE DONE
const mapHttpGetDone = function (err, data) {
    if (err) console.error(err);
    else console.log(data);
};

// MAIN DRIVER OF PROGRAM, ASYNC.MAP
async.map(urls, httpGetRequest, mapHttpGetDone);