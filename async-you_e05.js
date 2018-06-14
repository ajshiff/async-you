/**********************************************************
 * ASYNC TIMES
 **********************************************************/
const http = require('http');
const async = require('async');
const domain = process.argv[2];
const port = process.argv[3];
const url = domain + ':' + port;
var postPath = '/users/create';
var getPath = '/users';

const httpPostRequest = function (incrementor, manager) {
    incrementor++;
    var post_options = {
        host: domain,
        port: port,
        path: postPath,
        method: 'POST'
    };
    let postRequest = http.request(post_options, function (response) {
        let dataCollector = '';
        response.setEncoding('utf8').on('data', function (data) {});
        response.on('end', function () {
            manager(null, null);
        });
    });
    let jsondata = JSON.stringify({
        user_id: incrementor
    });
    postRequest.on('error', function (err) {
        manager(err, null);
    });
    // postRequest.write(jsondata, function () {
    //     postRequest.end();
    // });
    postRequest.write(jsondata);
    postRequest.end();

};

//httpPostRequest();

const httpGetRequest = function (url) {
    // console.log('BEGIN GET REQUEST: ');
    url = 'http://' + url + getPath;
    http.get(url, function (response) {
        let dataCollector = '';
        response.setEncoding('utf8').on('data', function (data) {
            dataCollector += data;
        });
        response.on('end', function () {
            console.log(dataCollector);
        });
    }).on('error', function (err) {

    });
};

async.times(5, httpPostRequest, (err, data) => {
    httpGetRequest(url);
});

var x = httpGetRequest();