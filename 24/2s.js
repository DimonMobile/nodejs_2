const express = require('express');
const app = express();
const crypto = require('crypto');
const fs = require('fs');


const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {type: 'pkcs1', format: 'pem'},
    privateKeyEncoding: {type: 'pkcs1', format: 'pem'}
});

function loadFileAndSign() {
    let fileData = Buffer.from(fs.readFileSync('host.txt', {encoding: 'binary'}));
    const sign = crypto.createSign('SHA256');
    sign.update(fileData);
    const signString = sign.sign(privateKey);
    const resultObject = {
        sign: signString.toString('base64'),
        data: fileData.toString('base64'),
        publicKey: publicKey
    }
    return resultObject;
}

app.get('/', (req, res) => {
    res.type('json');
    res.end(JSON.stringify(loadFileAndSign()));
});

app.listen(3000);