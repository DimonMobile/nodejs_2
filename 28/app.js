const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const openapidoc = require('./openapi');
const Model = require('./model');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapidoc));

app.use(express.urlencoded({ extended: false }));

app.get('/TS', (req, res, next) => {
    res.type('json');
    res.end(JSON.stringify(Model.getAll()));
});

app.delete('/TS', (req, res, next) => {
    let reqData = '';
    req.on('data', chunk => {
        reqData += chunk;
    });

    req.on('end', () => {
        let parsedObject = JSON.parse(reqData);
        Model.deleteItem(parsedObject.id);
        res.type('json');
        res.end(JSON.stringify({ status: 'ok' }));
    });
});

app.put('/TS', (req, res, next) => {
    let reqData = '';

    req.on('data', chunk => {
        reqData += chunk;
    });

    req.on('end', () => {
        let parsedObject = JSON.parse(reqData);
        if (Model.updateItem(parsedObject.id, parsedObject.name, parsedObject.num)) {
            res.type('json');
            res.end(JSON.stringify({ status: 'ok' }));
        } else {
            res.statusCode = 400;
            res.end();
        }
    });
});

app.post('/TS', (req, res, next) => {
    if (req.is('application/json')) {
        let reqData = '';

        req.on('data', chunk => {
            reqData += chunk;
        });

        req.on('end', () => {
            let parsedObject = JSON.parse(reqData);
            Model.addItem(parsedObject.name, parsedObject.num);
            res.type('json');
            res.end(JSON.stringify({ status: 'ok' }));
        });

    } else if (req.is('application/x-www-form-urlencoded')) {
        Model.addItem(req.body.name, req.body.num);
        res.type('json');
        res.end(JSON.stringify({ status: 'ok' }));
    } else {
        res.statusCode = 415;
        res.end();
        return;
    }
});

app.listen(3000);