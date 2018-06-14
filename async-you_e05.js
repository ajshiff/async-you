/**********************************************************
 * ASYNC TIMES
 **********************************************************/
const http = require('http');
const async = require('async');
const domain = process.argv[2];
const port = process.argv[3];
var postPath = '/users/create';
var getPath = '/users';
var getUrl = 'http://' + domain + ':' + port + getPath;

const httpPostRequest = function (incrementor, manager) {
    incrementor++;
    var post_options = {
        host: domain,
        port: port,
        path: postPath,
        method: 'POST'
    };
    let postRequest = http.request(post_options, function (response) {
        // let dataCollector = '';
        response.setEncoding('utf8').on('data', function (data) {});
        response.on('end', function () {});
    });
    let jsondata = JSON.stringify({
        user_id: incrementor
    });
    // postRequest.write(jsondata, function () {
    //     // manager(null, getUrl);
    //     postRequest.end(null, null, manager(null, getUrl));
    // });
    postRequest.end(jsondata, 'utf8', manager(null, getUrl));
    postRequest.on('error', function (err) {
        manager(err, null);
    });

};

//httpPostRequest();

const httpGetRequest = function (err, url) {
    http.get(url, function (response) {
        let dataCollector = '';
        response.setEncoding('utf8').on('data', function (data) {
            dataCollector += data;
        });
        response.on('end', function () {
            console.log(dataCollector);
        });
    }).on('error', function ( /*err*/ ) {

    });
};

// async.times(5, httpPostRequest, httpGetRequest);

async.times(5, httpPostRequest, function () {
    httpGetRequest(null, getUrl);
});