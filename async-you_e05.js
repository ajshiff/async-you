/**********************************************************
 * ASYNC TIMES
 **********************************************************/
// DECLARE VARIABLES AND INITIALIZE LIBRARIES
const http = require('http');
const async = require('async');
const domain = process.argv[2];
const port = process.argv[3];
var postPath = '/users/create';
var getPath = '/users';
var getUrl = 'http://' + domain + ':' + port + getPath;

// CREATE A POST REQUEST TO SEND A JSON STRING TO A WEB PAGE
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
        response.on('err', manager);
    });
    let jsondata = JSON.stringify({
        user_id: incrementor
    });
    // postRequest.write(jsondata, function () {
    //     // manager(null, getUrl);
    //     postRequest.end(null, null, manager(null, getUrl));
    // });
    postRequest.end(jsondata, 'utf8', function () {
        manager(null, getUrl); // Every time this runs, getUrl is stored in an array.
    });
    postRequest.on('error', function (err) {
        console.log('POST REQUEST THREW AN ERRoR');
        manager(err, null);
    });

};

// CREATE A GET REQUEST TO GATHER AND DISPLAY INFORMATION
const httpGetRequest = function (err, url) {
    http.get(url[0], function (response) {
        let dataCollector = '';
        response.setEncoding('utf8').on('data', function (data) {
            dataCollector += data;
        });
        response.on('end', function () {
            console.log(dataCollector);
        });
    }).on('error', console.log);
};

// THIS WORKS BECAUSE THE CALLBACK RECIEVED ALL THE DATA
// BUT THE KEY DATA IS PASSED INTO THE httpGetRequest FUNCTION DIRECTLY
// async.times(5, httpPostRequest, function () {
//     httpGetRequest(null, getUrl);
// });

// BELOW, THIS WORKS GREAT IF INSIDE THE httpGetRequest WHERE URL PRESENT ACCESSES
// ANY OF THE URL's ELEMENTS BECAUSE AN ARRAY IS BEING PASSED IN.
async.times(5, httpPostRequest, httpGetRequest);


/********************************************************************
 * BELOW IS THE MODUALIZED VERSION OF THE ANSWER PROVIDED BY ASNYC-YOU
 ********************************************************************/
// // DECLARE VARIABLES AND INITIALIZE LIBRARIES
// const http = require('http');
// const async = require('async');
// const hostname = process.argv[2];
// const port = process.argv[3];
// const url = 'http://' + hostname + ':' + port;

// // asyncTimes() IS THE FIRST FUNCTION TO RUN IN async.series().
// const asyncTimes = function (done) {
//     async.times(5, postRequest_addUser,
//         function (err) {
//             if (err) return done(err);
//             done(null, 'saved');
//         });
// };

// // postRequest_addUser() IS A DEPENDENCY FOR asyncTimes() TO WORK.
// function postRequest_addUser(user_id, manager) {
//     user_id++;
//     var jsonData = JSON.stringify({
//         'user_id': user_id
//     });
//     var opts = {
//         hostname: hostname,
//         port: port,
//         path: '/users/create',
//         method: 'POST',
//         headers: {
//             'Content-Length': jsonData.length
//         }
//     };
//     var req = http.request(opts, function (res) {
//         res.on('data', function ( /*chunk*/ ) {});
//         res.on('end', function () {
//             manager();
//         });
//     });
//     req.on('error', function (err) {
//         manager(err);
//     });
//     req.write(jsonData);
//     req.end();
// }

// // HTTPGETREQUEST 
// const httpGetRequest = function (manager) {
//     http.get(url + '/users', function (res) {
//         var body = '';
//         res.on('data', function (chunk) {
//             body += chunk.toString();
//         });
//         res.on('end', function () {
//             manager(null, body);
//         });
//     }).on('error', manager);
// };

// // MAIN DRIVER OF THE PROGRAM
// async.series({
//     post: asyncTimes,
//     get: httpGetRequest
// }, function done(err, result) {
//     if (err) return console.log(err);
//     console.log(result.get);
// });
/********************************************************************
 * ABOVE IS THE MODUALIZED VERSION OF THE ANSWER PROVIDED BY ASNYC-YOU
 ********************************************************************/