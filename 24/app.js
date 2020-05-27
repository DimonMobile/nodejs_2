const express = require('express');
const crypto = require('crypto');
const app = express();

const dh = crypto.createDiffieHellman(1024, 3)
let prime = dh.getPrime();
let generator = dh.getGenerator();
let k = dh.generateKeys();
console.log(k);

app.get('/', (req, res, next) => {
    res.end('kaban4ik');
});

app.listen(3000);

console.log('http//localhost:3000');