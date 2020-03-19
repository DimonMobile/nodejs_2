const fs = require('fs');

const dataFileName = 'models/contacts.json';

function getContacts() {
    const fileData = fs.readFileSync(dataFileName);
    return JSON.parse(fileData);
}

function addContact(contactData) {
    const fileDataObject = getContacts();
    fileDataObject.items.push(contactData);
    fs.writeFileSync(dataFileName, JSON.stringify(fileDataObject));
}

function updateContact(id, contactData) {
    const fileDataObject = getContacts();
    fileDataObject.items[id] = contactData;
    fs.writeFileSync(dataFileName, JSON.stringify(fileDataObject));
}

function removeContact(id) {
    console.log(`removeContact ${id} ${typeof id}`);
    const fileDataObject = getContacts();
    let items = [];
    console.log(`Before: ${JSON.stringify(fileDataObject.items)}`);
    items = fileDataObject.items.filter((v, index) => index != id);
    console.log(`After: ${JSON.stringify(items)}`);
    fs.writeFileSync(dataFileName, JSON.stringify({items: items}));
}

exports.get = getContacts;
exports.add = addContact;
exports.update = updateContact;
exports.remove = removeContact;