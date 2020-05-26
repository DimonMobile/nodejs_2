const express = require('express');
const app = express();
const fs = require('fs');
const { createClient } = require('webdav');
let client = null;

app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: '.'
    });
});

app.post('/', (req, res) => {
    client = createClient('https://webdav.yandex.ru', {
        username: req.body.username,
        password: req.body.password
    });
    res.end('Client created');
});

app.post('/md/:name', async (req, res) => {
    try {
        let dirName = req.params.name;
        let result = await client.exists(`/${dirName}`);
        if (result) {
            res.statusCode = 408;
            res.end();
        } else {
            await client.createDirectory(`/${dirName}`);
            res.end('Created');
        }
    } catch (err) {
        res.end(err.message);
    }
});

app.post('/rd/:name', async (req, res) => {
    try {
        let dirName = req.params.name;
        let result = await client.exists(`/${dirName}`);
        if (!result) {
            res.statusCode = 408;
            res.end();
        } else {
            await client.deleteFile(`/${dirName}`);
            res.end('Deleted');
        }
    } catch (err) {
        res.end(err.message);
    }
});

app.post('/up/:name', async (req, res) => {
    try {
        let dirName = req.params.name;
        let ws = client.createWriteStream(dirName);
        let rs = fs.createReadStream('kek.jpg');
        rs.pipe(ws);
        ws.on('finish', (e) => {
            res.end('Uploaded!');
        });
    } catch (err) {
        res.statusCode = 408;
        res.end(err.message);
    }
});

app.post('/down/:name', async (req, res) => {
    try {
        let dirName = req.params.name;
        if (! await client.exists(dirName)) {
            throw new Error('File not exists');
        }
        let rs = client.createReadStream(dirName);
        let ws = fs.createWriteStream('kek.jpg');
        rs.pipe(ws);
        ws.on('finish', (e) => {
            res.end('Downloaded!');
        });
    } catch (err) {
        res.statusCode = 408;
        res.end(err.message);
    }
});

app.post('/del/:name', async (req, res) => {
    try {
        let dirName = req.params.name;
        let result = await client.exists(`${dirName}`);
        if (!result) {
            res.statusCode = 408;
            res.end();
        } else {
            await client.deleteFile(`${dirName}`);
            res.end('Deleted');
        }
    } catch (err) {
        res.end(err.message);
    }
});

app.post('/copy/:from/:to', async (req, res) => {
    try {
        let fromName = req.params.from;
        let toName = req.params.to;
        let result = await client.exists(`${fromName}`);
        if (!result) {
            res.statusCode = 404;
            res.end();
        } else {
            await client.copyFile(fromName, toName);
            res.end('Copied');
        }
    } catch (err) {
        res.end(err.message);
    }
});

app.post('/move/:from/:to', async (req, res) => {
    try {
        let fromName = req.params.from;
        let toName = req.params.to;
        let result = await client.exists(`${fromName}`);
        if (!result) {
            res.statusCode = 404;
            res.end();
        } else {
            await client.moveFile(fromName, toName);
            res.end('Moved');
        }
    } catch (err) {
        res.end(err.message);
    }
});

app.listen(3000);