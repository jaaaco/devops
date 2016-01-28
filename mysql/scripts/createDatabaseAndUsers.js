#!/usr/bin/env node

/* usage:

./createDatabaseAndUsers.js

 if you have node installed
 script outputs query to create database and grant users all priviledges to each database

 */

// Settings
const host = '%';
const collate = 'utf8_polish_ci';
const charset = 'utf8';


var fs = require('fs');
var users = [];

String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
    var _token;
    var str = this + "";
    var i = -1;

    if ( typeof token === "string" ) {

        if ( ignoreCase ) {

            _token = token.toLowerCase();

            while( (
                i = str.toLowerCase().indexOf(
                    _token, i >= 0 ? i + newToken.length : 0
                ) ) !== -1
                ) {
                str = str.substring( 0, i ) +
                    newToken +
                    str.substring( i + token.length );
            }

        } else {
            return this.split( token ).join( newToken );
        }

    }
    return str;
};

function readLines(input, func) {
    var remaining = '';

    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            func(line);
            index = remaining.indexOf('\n');
        }
    });

    input.on('end', function() {
        if (remaining.length > 0) {
            func(remaining);

            // first line is ommited
            users.shift();

            var template = fs.readFileSync('template.sql').toString();

            template = template.replaceAll('$COLLATE', collate)
                .replaceAll('$CHARSET', charset)
                .replaceAll('$HOST', host);

            users.forEach(function(line){
                var lineData = line.split(',');

                var database = lineData[0].trim();
                var username = lineData[1].trim();
                var password = lineData[2].trim();

                var output = template.replaceAll('$USER', username)
                    .replaceAll('$PASSWORD', password)
                    .replaceAll('$DATABASE', database);

                console.log(output);

            });

            console.log('FLUSH PRIVILEGES;');

        }
    });
}

var input = fs.createReadStream('databasesAndUsers.csv');

readLines(input, function(line) {
    users.push(line);
});

