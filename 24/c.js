const http = require('http');
const crypto = require('crypto');
const fs = require('fs');

let dh = crypto.createDiffieHellman(256, 32);
let p = dh.getPrime();
let g = dh.getGenerator();
let A = dh.generateKeys();

let requestObject = {
    p: p.toString('hex'),
    g: g.toString('hex'),
    A: A.toString('hex')
};

function sendNext(secret) {
    http.request({
        method: 'get',
        host: 'localhost',
        port: 3000,
        path: '/resource'
    }, res => {
        let ws = fs.createWriteStream('./downloaded.txt');
        let cipheredData = '';
        res.on('data', chunk => {
            cipheredData += chunk;
        });

        res.on('end', () => {
            let obj = JSON.parse(cipheredData);
            let iv = Buffer.from(obj.iv, 'base64');
            let data = Buffer.from(obj.data, 'base64');
            let decipheriv = crypto.createDecipheriv('aes-256-cbc', secret, iv);
            decipheriv.update(data);
            ws.end(decipheriv.final());
        });
    }).end();
}

let request = JSON.stringify(requestObject);
let reqObject = http.request(
    {
        method: 'post',
        host: 'localhost',
        port: 3000,
        path: '/generate'
    }, res => {
        let collectedData = '';

        res.on('data', chunk => {
            collectedData += chunk;
        });

        res.on('end', () => {
            let B = Buffer.from(JSON.parse(collectedData).B, 'hex');
            let secret = dh.computeSecret(B);
            console.log(secret.toString('hex'));
            sendNext(secret);
        });
    }
);
reqObject.write(request);
reqObject.end();