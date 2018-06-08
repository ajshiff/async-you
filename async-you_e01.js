/**********************************************************
 * WATERFALL
 **********************************************************/
var async = require('async');
const http = require('http');
const fs = require('fs');
const filepath = process.argv[2];
console.log(filepath);



async.waterfall([
    function (callback) {
        /*let url = '';
        fs.readFile(filepath, 'utf8', function doneReading(err, fileContents) {
            // if (err) {throw err;}
            //console.log(fileContents);
            //url = fileContents;
            callback(fileContents)
        });*/
        callback(fs.readFile(filepath, 'utf8', function doneReading(err, fileContents) {
            // if (err) {throw err;}
            //console.log(fileContents);
            //url = fileContents;
            //callback(fileContents);
            return fileContents;
        }));
    },
    function (url) {
        console.log(url);
    }

]);