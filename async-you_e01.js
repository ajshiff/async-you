/**********************************************************
 * WATERFALL
 **********************************************************/
var async = require('async');
// const http = require('http');
// const fs = require('fs');
// const filepath = process.argv[2];
// console.log(filepath);

var one = 'one',
    two = 'two';

function myFristFunction(callback) {
    console.log('1: Start');
    callback(null, one, two);
}

function mySecondFunction(won, too, callback) {
    console.log('2 won: ' + won);
    console.log('2 too: ' + too);
    let wontoo = won + too;
    callback(null, wontoo);
}

function myThirdFunction(juan, callback) {
    console.log('3 juan: ' + juan);
    callback(null, juan);
}

function myFinalExecution(err, finalOutput) {
    if (err) {
        console.log('error: ' + err);
    }
    console.log('Result: ' + finalOutput);
}

/*
async.waterfall([
    function (callback) {
        // let url = '';
        fs.readFile(filepath, 'utf8', function doneReading(err, fileContents) {
            // if (err) {throw err;}
            // console.log(fileContents);
            // url = fileContents;
            callback(fileContents);
        });
        //callback(url);
    },
    function (url) {
        console.log(url);
    }

]);
*/

async.waterfall([
    myFristFunction,
    mySecondFunction,
    myThirdFunction
], myFinalExecution);