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
                description: 'Get full dictionary',
                responses: {
                    '200': {
                        description: 'Phone dictionary items'
                    }
                }
            },
            post: {
                tags: ['CRUD'],
                description: 'Add new element to dictionary',
                requestBody: {
                    content: {
                        'application/x-www-form-urlencoded': {
                            schema: {
                                type: 'object',
                                properties: {
                                    'name': {
                                        required: true,
                                        type: 'string',
                                        description: 'Name of newly created user'
                                    },
                                    'num': {
                                        required: true,
                                        type: 'string',
                                        description: 'Number of newly created user'
                                    }
                                },
                            },
                        },
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    'name': {
                                        required: true,
                                        type: 'string',
                                        description: 'Name of newly created user'
                                    },
                                    'num': {
                                        required: true,
                                        type: 'string',
                                        description: 'Number of newly created user'
                                    }
                                },
                            },
                            example: {
                                name: 'Петров',
                                num: '123457'
                            }
                        }
                    }
                },
                responses: {
                    '404': {
                        description: 'Api method not implemented yet'
                    },
                    '200': {
                        description: 'New item'
                    }
                }
            },
            put: {
                tags: ['CRUD'],
                description: 'Add new element to dictionary',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    'id': {
                                        required: true,
                                        type: 'integer',
                                        description: 'Id of user to change'
                                    },
                                    'name': {
                                        required: true,
                                        type: 'string',
                                        description: 'Name of updated created user'
                                    },
                                    'num': {
                                        required: true,
                                        type: 'string',
                                        description: 'Number of updated created user'
                                    }
                                },
                            },
                            example: {
                                id: 5,
                                name: 'Петров',
                                num: '123457'
                            }
                        }
                    }
                },
                responses: {
                    '404': {
                        description: 'Passed item not found'
                    },
                    '200': {
                        description: 'New item'
                    }
                }
            },
            delete: {
                tags: ['CRUD'],
                description: 'Delete item with given id',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    'id': {
                                        required: true,
                                        type: 'integer',
                                        description: 'Id of user to change'
                                    },
                                },
                            },
                            example: {
                                id: 1,
                            }
                        }
                    }
                },
                responses: {
                    '404': {
                        description: 'Passed item not found'
                    },
                    '200': {
                        description: 'New item'
                    }
                }
            }
        }
    }
}

module.exports = openapi;