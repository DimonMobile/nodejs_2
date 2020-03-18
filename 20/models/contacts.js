const fs = require('fs');

const dataFileName = 'models/contacts.json';

exports.get = function getContacts() {
    const fileData = fs.readFileSync(dataFileName);
    return JSON.parse(fileData);
}

exports.add = function addContact(contactData) {
    const fileDataObject = getContacts();
    fileDataObject.items.push(contactData);
    fs.writeFileSync(dataFileName, JSON.stringify(fileDataObject));
}

exports.update = function updateContact(id, contactData) {
    const fileDataObject = getContacts();
    fileDataObject.items[id] = contactData;
    fs.writeFileSync(dataFileName, JSON.stringify(fileDataObject));
}

exports.remove = function removeContact(id) {
    const fileDataObject = getContacts();
    let items = [];
    for (let i = 0 ; i < fileDataObject.items.length; ++i) {
        if (i !== id) {
            items.push(fileDataObject.items[i]);
        }
    }
    fs.writeFile(dataFileName, JSON.stringify({items: items}));
}