const JsonRPCServer = require('jsonrpc-server-http-nats');

let server = new JsonRPCServer();

server.on('ping', (response) => {
    let error = null;
    let result = 'pong';
    response(error, result);
});

server.on('sum', (params, channel, response) => {
    response(null, params.reduce((a, p) => a += p));
});

server.on('mul', (params, channel, response) => {
    response(null, params.reduce((a, p) => a *= p));
});

server.on('div', (params, channel, response) => {
    response(null, params[0] / params[1])
});

server.on('proc', (params, channel, response) => {
    response(null, params[0] / params[1] * 100);
});

server.listenHttp(
    {
        host: 'localhost',
        port: 3000,
    },
    () => {
        console.log('JSON RPC ready');
    }
);