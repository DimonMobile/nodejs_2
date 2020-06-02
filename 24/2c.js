const http = require('http');
const crypto = require('crypto');

http.request('http://localhost:3000', res => {
    let retrievedData = '';
    res.on('data', chunk => {
        retrievedData += chunk;
    });

    res.on('end', () => {
        let parsedObject = JSON.parse(retrievedData);
        let verifyObject = crypto.createVerify('SHA256');
        verifyObject.update(Buffer.from(parsedObject.data, 'base64'));
        console.log(verifyObject.verify(parsedObject.publicKey, Buffer.from(parsedObject.sign, 'base64')));
    });
}).end();