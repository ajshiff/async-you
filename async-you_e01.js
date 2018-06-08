/**********************************************************
 * WATERFALL
 **********************************************************/
var async = require('async');
const http = require('http');
const fs = require('fs');
const filepath = process.argv[2];
console.log(filepath);

readFile = function (callback) {
    fs.readFile(filepath);
    callback(null, one, two)
};


async.waterfall([
    readFile
]);


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