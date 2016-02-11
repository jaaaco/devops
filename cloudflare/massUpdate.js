#!/usr/bin/env node
'use strict';

if (process.argv.length != 6) {
    console.log('Updates ip address for (www.)domains from file');
    console.log('usage: ');
    console.log('./massUpdate.js cloudFlareEmail cloudFlareKey domainFile ip-address');
    return;
}

const cloudFlareEmail =  process.argv[2];
const cloudFlareKey =  process.argv[3];
const domainFile = process.argv[4];
const ip = process.argv[5];

var exec = require('child_process').exec;
var domains = [];
var fs = require('fs');

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

            domains.forEach(function(domain){
                console.log('domain', domain);
                exec(process.env.PWD + '/dns.js ' + [cloudFlareEmail,cloudFlareKey,domain,ip].join(' '),function(error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
            });
        }
    });
}

var input = fs.createReadStream(domainFile);
readLines(input, function(line) {
    domains.push(line);
});


