const express = require('express');
const fs = require('fs');

const app = express();
app.use('/', express.static('.'));

app.listen(3000, async () => {
    let wasmData = fs.readFileSync('result.wasm');
    let wasmModule = new WebAssembly.Module(wasmData);
    let wasmInstance = new WebAssembly.Instance(wasmModule, {});

    console.log(wasmInstance.exports.sum(3, 4));
    console.log(wasmInstance.exports.sub(3, 4));
    console.log(wasmInstance.exports.mul(3, 4));
});