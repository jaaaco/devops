#!/usr/bin/env node
'use strict';

if (process.argv.length != 6) {
    console.log('Updates ip address for specified domain and www.domain if A record is present');
    console.log('usage: ');
    console.log('./dns.js cloudFlareEmail cloudFlareKey domain-name ip-address');
    return;
}
const request = require('request');

const domain = process.argv[4];
const ip = process.argv[5];

function apiGet(method,callback) {
    var options = {
        url: 'https://api.cloudflare.com/client/v4/' + method,
        headers: {
            'X-Auth-Key': process.argv[3],
            'X-Auth-Email':  process.argv[2]
        }
    };

    request.get(options,function(err, response, body){
        if (err) {
            console.log('Error', err);
            return;
        }
        callback(JSON.parse(body));
    });
}

function apiPut(method, data, callback) {
    var options = {
        url: 'https://api.cloudflare.com/client/v4/' + method,
        headers: {
            'X-Auth-Key': process.argv[3],
            'X-Auth-Email':  process.argv[2]
        },
        json: data
    };

    request.put(options,function(err, response, body){
        if (err) {
            console.log('Error', err);
            return;
        }
        callback(body);
    });
}

apiGet('zones/?name=' + domain, function(zone){
    apiGet('zones/' + zone.result[0].id + '/dns_records?type=A&name=' + domain, function(records){

        records.result.forEach(function(entry){
            apiPut('zones/' + zone.result[0].id + '/dns_records/' + entry.id, {id: entry.id, type: 'A', name: domain, content: ip}, function(result){
                console.log(result);
            });
        });
    });

    apiGet('zones/' + zone.result[0].id + '/dns_records?type=A&name=www.' + domain, function(records){
        records.result.forEach(function(entry){
            apiPut('zones/' + zone.result[0].id + '/dns_records/' + entry.id, {id: entry.id, type: 'A', name: 'www.' + domain, content: ip}, function(result){
                console.log(result);
            });
        });
    });
});



