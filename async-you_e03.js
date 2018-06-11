/**********************************************************
 * ASYNC EACH
 **********************************************************/
const http = require('http');
const async = require('async');
const url1 = process.argv[2];
const url2 = process.argv[3];
var urls = [url1, url2];

const httpGetRequest = function (url, manager) {
    http.get(url, function (response) {}).on('error', function (err) {
        manager(err);
    });
};

const logErrors = function (err, result) {
    if (err) console.error(err);
    else console.log('SUCCESS! ' + result);
};

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