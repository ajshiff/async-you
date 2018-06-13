/**********************************************************
 * ASYNC TIMES
 **********************************************************/
const http = require('http');
const async = require('async');
const url = process.argv[2] + process.argv[3];
// console.log(process.argv[2]);
// console.log(process.argv[3]);

const httpPostRequest = function (url, manager) {
    http.request('POST', url, function (response) {

    }).on('error', function (err) {
        manager(err)
    });
}

const httpGetRequest = function (url, manager) {
    url += extension;
    http.get(url, function (response) {
        let dataCollector = '';
        response.setEncoding('utf8').on('data', function (data) {
            dataCollector += data;
        });
        response.on('end', function () {
            manager(null, dataCollector);
        })
    }).on('error', function (err) {
        manager(err);
    });
};

async.times(5, function (manager) {
    httpPostRequest(url, manager)
}, httpGetRequest)