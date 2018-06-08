/**********************************************************
 * WATERFALL
 **********************************************************/
var async = require('async');
const http = require('http');
const fs = require('fs');
const filepath = process.argv[2];
/*
async.waterfall([
    function (callback) {
        callback(null, 'one', 'two');
    },
    function (arg1, arg2, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function (arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function (err, result) {
    // result now equals 'done'
});
*/

// Or, with named functions:
async.waterfall([
    myFirstFunction,
    mySecondFunction,
    myLastFunction,
], function (err, result) {
    console.log(result);
    // result now equals 'done'
});

function myFirstFunction(callback) {
    setTimeout(function () {
        console.log('START');
    }, 3000);
    callback(null, 'one', 'two');
}

function mySecondFunction(arg1, arg2, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    console.log(arg1, arg2);
    //setTimeout(callback(null, 'three'), 3000);
    callback(null, 'three');
}

function myLastFunction(arg1, callback) {
    // arg1 now equals 'three'
    console.log(arg1);
    callback(null, 'done');
}