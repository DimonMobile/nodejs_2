const http = require('http');
const crypto = require('crypto');

let dh = crypto.createDiffieHellman(1024, 32);
let p = dh.getPrime();
let g = dh.getGenerator();
let A = dh.generateKeys();

let requestObject = {
    p: p.toString('hex'),
    g: g.toString('hex'),
    A: A.toString('hex')
};
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
        });
    }
);
reqObject.write(request);
reqObject.end();