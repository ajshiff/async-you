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
// console.log(process.argv[2]);
// console.log(process.argv[3]);
// console.log(url);

const httpPostRequest = function (incrementor) {
    console.log('PRINT INCREMENTOR: ' + incrementor);
    // incrementor++;
    // console.log('PRINT TWO: ' + incrementor);
    var post_options = {
        host: domain,
        port: port,
        path: postPath,
        method: 'POST'
    };
    let postRequest = http.request(post_options, function (response) {
        // let dataCollector = '';
        // response.setEncoding('utf8').on('data', function (data) {
        //     // console.log(data);
        //     // dataCollector += data;
        // });
        // response.on('end', function () {
        //     // manager(null, dataCollector);
        // });
    });
    let jsondata = JSON.stringify({
        user_id: incrementor
    });
    console.log('JSONData: ' + jsondata)
    postRequest.write(jsondata);
    postRequest.end();
    postRequest.on('error', function (err) {});
};

httpPostRequest();

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

async.times(5, httpPostRequest, httpGetRequest(url));