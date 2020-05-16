let https = require('https');
let fs = require('fs');

let options = {
    key: fs.readFileSync('LAB.key'),
    cert: fs.readFileSync('LAB.crt')
};

https.createServer(options, (req, res) => {
    res.end('Hello from https!');
}).listen(3000);

console.log('https://PLOT:3000');