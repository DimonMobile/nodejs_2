const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejs', 'student', 'fitfit', { host: '127.0.0.1', dialect: 'mssql' });
const Model = Sequelize.Model;
const http = require('http');
const fs = require('fs');


class Faculty extends Model { }
class Teacher extends Model { }
class Pulpit extends Model { }
class Subject extends Model { }
class Auditorium extends Model { }
class Auditorium_type extends Model { }


function createModels() {
    Faculty.init({
        faculty: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        faculty_name: { type: Sequelize.STRING, allowNull: false }
    }, {
        sequelize,
        modelName: 'Faculty',
        tableName: 'Faculty',
        timestamps: false
    });

    Pulpit.init({
        pulpit: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        pulpit_name: { type: Sequelize.STRING, allowNull: false },
        faculty: { type: Sequelize.STRING, allowNull: false, references: { model: Faculty, key: 'faculty' } }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Pulpit',
        tableName: 'Pulpit'
    });

    Teacher.init({
        teacher: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        teacher_name: { type: Sequelize.STRING, allowNull: false },
        pulpit: { type: Sequelize.STRING, allowNull: false, references: { model: Pulpit, key: 'pulpit' } }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Teacher',
        tableName: 'Teacher'
    });

    Subject.init({
        subject: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        subject_name: { type: Sequelize.STRING, allowNull: false },
        pulpit: { type: Sequelize.STRING, allowNull: false, references: { model: Pulpit, key: 'pulpit' } }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Subject',
        tableName: 'Subject'
    });

    Auditorium_type.init({
        auditorium_type: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        auditorium_typename: { type: Sequelize.STRING, allowNull: false }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Auditorium_type',
        tableName: 'Auditorium_type'
    });

    Auditorium.init({
        auditorium: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        auditorium_name: { type: Sequelize.STRING, allowNull: false },
        auditorium_capacity: { type: Sequelize.INTEGER, allowNull: false },
        auditorium_type: { type: Sequelize.STRING, allowNull: false, references: { model: Auditorium_type, key: 'auditorium_type' } }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Auditorium',
        tableName: 'Auditorium'
    });
}

createModels();

const PORT = 3000;

sequelize.authenticate().then(() => {
    http.createServer((req, res) => {
        const splitted = req.url.split('/');
        if (req.method === 'GET') {
            if (req.url === '/') {
                fs.readFile('./index.html', (err, data) => {
                    res.writeHead(200, { 'Content-type': 'text/html' });
                    res.end(data);
                });
            } else if (splitted.length >= 3 && splitted[1] === 'api') {
                res.writeHead(200, { 'Content-type': 'application/json' });
                if (splitted[2] === 'faculties') {
                    Faculty.findAll().then(faculties => {
                        res.end(JSON.stringify(faculties));
                    });
                } else if (splitted[2] === 'pulpits') {
                    Pulpit.findAll().then(pulpits => {
                        res.end(JSON.stringify(pulpits));
                    });
                } else if (splitted[2] === 'subjects') {
                    Pulpit.findAll().then(subjects => {
                        res.end(JSON.stringify(subjects));
                    });
                } else if (splitted[2] === 'auditoriumstypes') {
                    Auditorium_type.findAll().then(auditoriumstypes => {
                        res.end(JSON.stringify(auditoriumstypes));
                    });
                } else if (splitted[2] === 'auditoriums') {
                    Auditorium_type.findAll().then(auditoriumstypes => {
                        res.end(JSON.stringify(auditoriumstypes));
                    });
                }
            }
        } else if (req.method === 'POST') {
            if (splitted.length >= 3 && splitted[1] === 'api') {
                res.writeHead(200, { 'Content-type': 'application/json' });
                if (splitted[2] === 'faculties') {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        Faculty.create(JSON.parse(data)).then(faculty => {
                            res.end(JSON.stringify(faculty));
                        }).catch(err => {
                            res.end(JSON.stringify({error: err.message}));
                        });
                    });
                } else if (splitted[2] === 'pulpits') {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        Pulpit.create(JSON.parse(data)).then(faculty => {
                            res.end(JSON.stringify(faculty));
                        }).catch(err => {
                            res.end(JSON.stringify({error: err.message}));
                        });
                    });
                } else if (splitted[2] === 'subjects') {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        Subject.create(JSON.parse(data)).then(faculty => {
                            res.end(JSON.stringify(faculty));
                        }).catch(err => {
                            res.end(JSON.stringify({error: err.message}));
                        });
                    });
                } else if (splitted[2] === 'auditoriumstypes') {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        Auditorium_type.create(JSON.parse(data)).then(faculty => {
                            res.end(JSON.stringify(faculty));
                        }).catch(err => {
                            res.end(JSON.stringify({error: err.message}));
                        });
                    });
                } else if (splitted[2] === 'auditoriums') {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        Auditorium.create(JSON.parse(data)).then(faculty => {
                            res.end(JSON.stringify(faculty));
                        }).catch(err => {
                            res.end(JSON.stringify({error: err.message}));
                        });
                    });
                }
            }
        } else if (req.method === 'PUT') {
            if (splitted.length >= 3 && splitted[1] === 'api') {
                res.writeHead(200, { 'Content-type': 'application/json' });
                if (splitted[2] === 'faculties') {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        let facObject = JSON.parse(data);
                        Faculty.update(facObject, {where: {faculty: facObject.faculty}}).then(faculty => {
                            res.end(JSON.stringify(faculty));
                        }).catch(err => {
                            res.end(JSON.stringify({error: err.message}));
                        });
                    });
                } else if (splitted[2] === 'pulpits') {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        Pulpit.create(JSON.parse(data)).then(faculty => {
                            res.end(JSON.stringify(faculty));
                        }).catch(err => {
                            res.end(JSON.stringify({error: err.message}));
                        });
                    });
                } else if (splitted[2] === 'subjects') {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        Subject.create(JSON.parse(data)).then(faculty => {
                            res.end(JSON.stringify(faculty));
                        }).catch(err => {
                            res.end(JSON.stringify({error: err.message}));
                        });
                    });
                } else if (splitted[2] === 'auditoriumstypes') {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        Auditorium_type.create(JSON.parse(data)).then(faculty => {
                            res.end(JSON.stringify(faculty));
                        }).catch(err => {
                            res.end(JSON.stringify({error: err.message}));
                        });
                    });
                } else if (splitted[2] === 'auditoriums') {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        Auditorium.create(JSON.parse(data)).then(faculty => {
                            res.end(JSON.stringify(faculty));
                        }).catch(err => {
                            res.end(JSON.stringify({error: err.message}));
                        });
                    });
                }
            }
        } else if (req.method === 'DELETE') {
            if (splitted.length >= 4 && splitted[1] === 'api') {
                res.writeHead(200, { 'Content-type': 'application/json' });
                if (splitted[2] === 'faculties') {
                    Faculty.destroy({where: {faculty: splitted[3]}}).then(faculty => {
                        res.end(JSON.stringify(faculty));
                    }).catch(err => {
                        res.end(JSON.stringify({err: err.message}));
                    });
                } else if (splitted[2] === 'pulpits') {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        Pulpit.create(JSON.parse(data)).then(faculty => {
                            res.end(JSON.stringify(faculty));
                        }).catch(err => {
                            res.end(JSON.stringify({error: err.message}));
                        });
                    });
                } else if (splitted[2] === 'subjects') {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        Subject.create(JSON.parse(data)).then(faculty => {
                            res.end(JSON.stringify(faculty));
                        }).catch(err => {
                            res.end(JSON.stringify({error: err.message}));
                        });
                    });
                } else if (splitted[2] === 'auditoriumstypes') {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        Auditorium_type.create(JSON.parse(data)).then(faculty => {
                            res.end(JSON.stringify(faculty));
                        }).catch(err => {
                            res.end(JSON.stringify({error: err.message}));
                        });
                    });
                } else if (splitted[2] === 'auditoriums') {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    });
                    req.on('end', () => {
                        Auditorium.create(JSON.parse(data)).then(faculty => {
                            res.end(JSON.stringify(faculty));
                        }).catch(err => {
                            res.end(JSON.stringify({error: err.message}));
                        });
                    });
                }
            }
        } 
    }).listen(PORT);
    console.log(`Server at http://127.0.0.1:${PORT}`);
}).catch(err => {
    console.error(`Database connection error: ${err.message}`);
});