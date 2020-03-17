exports.UserModel = {
    userData: [
        { first_name: 'John', last_name: 'Cena' },
        { first_name: 'Kled', last_name: 'Linkton' },
        { first_name: 'Vasya', last_name: 'Inokentive4' }
    ],
    add: function(fname, lname) {
        this.userData.push({fname, lname});
    },

    get: function(id) {
        return this.userData[id];
    }
}