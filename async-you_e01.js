/**********************************************************
 * WATERFALL
 **********************************************************/
var async = require('async');
const http = require('http');
const fs = require('fs');
const filepath = process.argv[2];
// console.log(filepath);

var readFile = function (callback) {
    fs.readFile(filepath, 'utf8', function (err, fileContents) {
        if (err) {
            // console.log('<-=SOMETHING WENT WRONG!-=>');
        } else {
            // console.log('<-=SOMETHING WENT RIGHT!-=>');
            // console.log(fileContents);
            callback(null, fileContents);
        }
    });
};

var httpGetFrom = function (url, callback) {
    http.get(url, function (response) {
        var dataCollector = '';
        response.setEncoding().on('data', function (data) {
            dataCollector += data;
        });
        response.on('end', function () {
            // console.log(dataCollector);
            callback(null, dataCollector);
        });
    });
};

var printResults = function (err, results) {
    console.log(results);
};

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