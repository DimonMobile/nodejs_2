const express = require('express');
const crypto = require('crypto');
const app = express();
const fs = require('fs');

let secret = null;

app.post('/generate', (req, res, next) => {
    let collectedData = '';

    req.on('data', chunk => {
        collectedData += chunk;
    });

    req.on('end', () => {
        let parsed = JSON.parse(collectedData);

        let dh = crypto.createDiffieHellman(Buffer.from(parsed.p, 'hex'), Buffer.from(parsed.g, 'hex'));
        let B = dh.generateKeys();
        secret = dh.computeSecret(Buffer.from(parsed.A, 'hex'));
        console.log(secret.toString('hex'));

        res.type('json');
        res.end(JSON.stringify({
            B: B.toString('hex')
        }));
    });
});

app.get('/resource', (req, res, next) => {
    const iv = crypto.randomBytes(16);
    let cipheriv = crypto.createCipheriv('aes-256-cbc', secret, iv);
    let readedData = fs.readFileSync('./host.txt');
    cipheriv.update(Buffer.from(readedData, 'binary'));
    res.end(JSON.stringify({
        iv: iv.toString('base64'),
        data: cipheriv.final().toString('base64')
    }));
});

app.listen(3000);

console.log('http://localhost:3000');
