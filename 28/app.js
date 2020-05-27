const app = require('express')();
const swaggerUi = require('swagger-ui-express');
const openapidoc = require('./openapi');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapidoc));
app.listen(3000);