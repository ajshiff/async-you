/**********************************************************
 * SERIES OBJECT
 * series runs an arrary or object of functions in series,
 * then gives the collection of their responses as a result
 * to a final function. series runs in series.
 **********************************************************/
// INITIALIZE LIBRARIES, DECLARE GLOBAL VARIABLES
const async = require('async');
const http = require('http');
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
            // console.log(dataCollector); // Troubleshooter
            manager(null, dataCollector); // #2
            // return dataCollector; // #3
        });
    });
};

const printResults = function (err, results) {
    console.log(results);
};

// httpGetFrom(url1); // Troubleshooter
// httpGetFrom(url2); // Troubleshooter

// #1 CANNOT ASSIGN UNIQUE URLS -- 
// async.series({
//     requestOne: httpGetFrom,
//     requestTwo: httpGetFrom
// }, printResults);


// #2 WORKS -- CREATES A FUNCTION THAT PASSES MANAGER TO THE HTTPGETFROM
async.series({
    requestOne: function (manager) {
        httpGetFrom(url1, manager);
    },
    requestTwo: function (manager) {
        httpGetFrom(url2, manager);
    }
}, printResults);

// #3 MANAGER DOES NOT YIELD TO THE ASYNC FUNCTION IT CALLS
// async.series({
//     requestOne: function (manager) {manager (null, httpGetFrom(url1));},
//     requestTwo: function (manager) {manager (null, httpGetFrom(url2));}
// }, printResults);

// #4 WORKS -- FUNCTION THAT CREATES A FUNCTION THAT WORKS EXACTLY AS #2
// function makeAGetFunction(url) {
//     return function (manager) {
//         httpGetFrom(url, manager);
//     };
// }
// async.series({
//     requestOne: makeAGetFunction(url1),
//     requestTwo: makeAGetFunction(url2)
// }, printResults);

// BONUS, UNRELATED -- IIFY FUNCTIONS AND CLOSURES
// var hi = (function () {
//     var num;
//     function changeNum(numIn) {
//         if (nunIn > 5) {
//             num = numIn;
//         }
//     }
//     //aksdjf
//     return {
//         setNum: changeNum
//     };
// })()
// hi.setNum(3)