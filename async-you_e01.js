/**********************************************************
 * WATERFALL
 **********************************************************/
// INITIALIZE LIBRARIES, DECLARE GLOBAL VARIABLES
const async = require('async');
const http = require('http');
const fs = require('fs');
const filepath = process.argv[2];

// READFILE ASYNC FUNCTION
var readFile = function (callback) {
    fs.readFile(filepath, 'utf8', function (err, fileContents) {
        if (err) {
            throw err;
        } else {
            callback(null, fileContents);
        }
    });
};
// HTTP.GET ASYNC FUNCTION
var httpGetFrom = function (url, callback) {
    http.get(url, function (response) {
        var dataCollector = '';
        response.setEncoding('utf8').on('data', function (data) {
            dataCollector += data;
        });
        response.on('end', function () {
            callback(null, dataCollector);
        });
    });
};

// PRINT RESULTS CALLBACK FUNCTION
var printResults = function (err, results) {
    console.log(results);
};

// MAIN HANDLER: HANDLE IN SERIES via WATERFALL
async.waterfall([
    readFile,
    httpGetFrom,
], printResults);


/*********************************************************************
 * ===============================START-------------------------------
 * Below is code for experimenting to understand how waterfall behaves
 *********************************************************************/
// var one = 'one',
//     two = 'two';

// function myFristFunction(callback) {
//     console.log('1: Start');
//     callback(null, one, two);
// }

// function mySecondFunction(won, too, callback) {
//     console.log('2 won: ' + won);
//     console.log('2 too: ' + too);
//     let wontoo = won + too;
//     callback(null, wontoo);
// }

// function myThirdFunction(juan, callback) {
//     console.log('3 juan: ' + juan);
//     callback(null, juan);
// }

// function myFinalExecution(err, finalOutput) {
//     if (err) {
//         console.log('error: ' + err);
//     }
//     console.log('Result: ' + finalOutput);
// }

// async.waterfall([
//     myFristFunction,
//     mySecondFunction,
//     myThirdFunction
// ], myFinalExecution);
/*********************************************************************
 * Above is code for experimenting to understand how waterfall behaves
 * --------------------------------END================================
 *********************************************************************/