let openapi = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'BSTU',
        description: 'BSTU API',
        contact: {
            name: 'Mobile',
            url: 'http://bigblackduck.com',
            email: 'mobik.dimka@gmail.com'
        },
        license: {
            name: 'LGPL3',
            url: 'https://www.gnu.org/licenses/lgpl-3.0.en.html'
        }
    },

    servers: [{
        url: 'http://localhost:{port}',
        description: 'Development server',
        variables: {port: {default: 3000}}
    }],

    paths: {
        '/TS': {
            get: {
                tags: ['CRUD'],
                description: 'Get full dictionary'
            },
            post: {
                tags: ['CRUD'],
                description: 'Add new element to dictionary',
                parameters: [
                    
                ]
            },
            put: {
                tags: ['CRUD'],
                description: 'Edits dictionary element'
            },
            delete: {
                tags: ['CRUD'],
                description: 'Drop dictionary element with given id'
            }
        }
    }
}

module.exports = openapi;