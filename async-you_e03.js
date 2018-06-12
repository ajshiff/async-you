/**********************************************************
 * ASYNC EACH
 **********************************************************/
// DECLARE NEEDED VARIABLES AND INLCUDE NEEDED LIBRARIES
const http = require('http');
const async = require('async');
const url1 = process.argv[2];
const url2 = process.argv[3];

// A COLLECTION OF URLS TO SEND REQUESTS TO
var urls = [url1, url2]; // OR
// var urls = process.argv.slice(2)


// FUNCTION TO SEND HTTP GET REQUEST
const httpGetRequest = function (url, manager) {
    http.get(url, function (response) {}).on('error', function (err) {
        manager(err);
    });
};

// FUNCTION TO LOG EACH REQUEST
const logErrors = function (err, result) {
    if (err) console.error(err);
    else console.log('SUCCESS! ' + result);
};

// ASYNC EACH, MAIN DRIVER OF SCRIPT
async.each(urls, httpGetRequest, logErrors);

// ASYNC-YOU's GIVEN SOULTION
// var http = require('http'),
//     async = require('async');

// async.each(process.argv.slice(2), function (item, done) {
//         http.get(item, function (res) {
//             res.on('data', function (chunk) {});

//             res.on('end', function () {
//                 done(null);
//             });
//         }).on('error', function (err) {
//             done(err);
//         });
//     },
//     function (err) {
//         if (err) console.error('THIS COUNTS AS AN ERRoR:' + err);
//     });