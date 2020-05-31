const express = require('express');
const crypto = require('crypto');
const app = express();

app.post('/generate', (req, res, next) => {
    let collectedData = '';

    req.on('data', chunk => {
        collectedData += chunk;
    });

    req.on('end', () => {
        let parsed = JSON.parse(collectedData);

        let dh = crypto.createDiffieHellman(Buffer.from(parsed.p, 'hex'), Buffer.from(parsed.g, 'hex'));
        let B = dh.generateKeys();
        let secret = dh.computeSecret(Buffer.from(parsed.A, 'hex'));
        console.log(secret.toString('hex'));

        res.type('json');
        res.end(JSON.stringify({
            B: B.toString('hex')
        }));
    });
});

app.listen(3000);

console.log('http://localhost:3000');
