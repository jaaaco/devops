#!/usr/bin/env node
'use strict';

const request = require('request')

// u0VT5Yt9cNpnErcyw9rciN8uBWEaBB0tiKTZ1cuq
// 64f625cb3902969c813f2df5417c6c69

if (process.argv.length != 5) {
    console.log('Deletes all records in a zone');
    console.log('usage: ');
    console.log('./delete-all-records.js cloudFlareEmail cloudFlareKey zone-id');
    process.exit(0);
}

const cloudFlareEmail =  process.argv[2];
const cloudFlareKey =  process.argv[3];
const zoneId = process.argv[4];

console.info({ cloudFlareKey, cloudFlareEmail })

function apiGet(method,callback) {
    var options = {
        url: 'https://api.cloudflare.com/client/v4/' + method,
        headers: {
            Authorization: 'Bearer ' + cloudFlareKey
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

function apiDelete(method,callback) {
    var options = {
        url: 'https://api.cloudflare.com/client/v4/' + method,
        headers: {
            Authorization: 'Bearer ' + cloudFlareKey
        }
    };

    request.delete(options,function(err, response, body){
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

apiGet(`zones/${zoneId}/dns_records?per_page=100`, zone => {
    for (let i = 0; i < zone.result.length; i++) {
        console.info({ delete: zone.result[i].name })
        apiDelete(`zones/${zoneId}/dns_records/${zone.result[i].id}`, result => console.info)
    }
})