const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejs', 'student', 'fitfit', {host: '127.0.0.1', dialect: 'mssql'});
const Model = Sequelize.Model;


class Faculty extends Model {}
class Teacher extends Model {}
class Pulpit extends Model {}
class Subject extends Model {}
class Auditorium extends Model {}
class Auditorium_type extends Model{}


function createModels() {
    Faculty.init({
        faculty: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        faculty_name: {type: Sequelize.STRING, allowNull: false}
    }, {
        sequelize,
        modelName: 'Faculty',
        tableName: 'Faculty',
        timestamps: false        
    });

    Pulpit.init({
        pulpit: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        pulpit_name: {type: Sequelize.STRING, allowNull: false},
        faculty: {type: Sequelize.STRING, allowNull: false, references: {model: Faculty, key: 'faculty'}}
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Pulpit',
        tableName: 'Pulpit'
    });

    Teacher.init({
        teacher: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        teacher_name: {type: Sequelize.STRING, allowNull: false},
        pulpit: {type: Sequelize.STRING, allowNull: false, references: {model: Pulpit, key: 'pulpit'}}
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Teacher',
        tableName: 'Teacher'
    });

    Subject.init({
        subject: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        subject_name: {type: Sequelize.STRING, allowNull: false},
        pulpit: {type: Sequelize.STRING, allowNull: false, references: {model: Pulpit, key: 'pulpit'}}
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Subject',
        tableName: 'Subject'
    });

    Auditorium_type.init({
        auditorium_type: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        auditorium_typename: {type: Sequelize.STRING, allowNull: false}
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Auditorium_type',
        tableName: 'Auditorium_type'
    });

    Auditorium.init({
        auditorium: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        auditorium_name: {type: Sequelize.STRING, allowNull: false},
        auditorium_capacity: {type: Sequelize.INTEGER, allowNull: false},
        auditorium_type: {type: Sequelize.STRING, allowNull: false, references: {model: Auditorium_type, key: 'auditorium_type'}}
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Auditorium',
        tableName: 'Auditorium'
    });
}


createModels();
sequelize.authenticate().then(() => {
    sequelize.sync().then(() => sequelize.close());
    // console.log('Success');
    // Faculty.findAll().then(faculties => {
    //     console.log(`All faculties: ${JSON.stringify(faculty)}`);
    //     sequelize.close();
    // });
}).catch(err => {
    console.log(err.message);
});