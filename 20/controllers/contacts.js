const contactsModel = require('../models/contacts')

exports.getContacts = function (req, res) {
    res.render('index', {contacts: contactsModel.get().items});
}

exports.addContacts = function (req, res) {
    res.render('add', {contacts: contactsModel.get().items});
}

exports.updateContacts = function (req, res) {
    let contacts = contactsModel.get().items;
    let activeContactId = req.query.id;
    let activeContact = contacts[activeContactId];

    res.render('update', {contacts: contacts, activeContact: activeContact, activeContactId: activeContactId});
}

exports.deleteContact = function (req, res) {
    contactsModel.remove(parseInt(req.body.id));
    res.redirect(301, '/');
}

exports.updateContact = function (req, res) {
    contactsModel.update(req.body.id, req.body.newdata);
    res.redirect(301, '/');
};

exports.addContact = function (req, res) {
    contactsModel.add(req.body.newdata);
    res.redirect(301, '/');
}