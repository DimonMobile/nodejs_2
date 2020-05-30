const fs = require('fs');

const modelFileName = './dict.json';

module.exports.addItem = function(name, num) {
    let dataObject = JSON.parse(fs.readFileSync(modelFileName));
    dataObject.lastItem = dataObject.lastItem + 1;
    let lastItem = dataObject.lastItem;
    dataObject.items.push({
        id: lastItem,
        name: name,
        num: num
    });
    fs.writeFileSync(modelFileName, JSON.stringify(dataObject));
}

module.exports.updateItem = function(id, name, num) {
    let dataObject = JSON.parse(fs.readFileSync(modelFileName));
    let found = false;
    for (item of dataObject.items) {
        if (item.id === id) {
            item.name = name;
            item.num = num;
            found = true;
            break;
        }
    }
    fs.writeFileSync(modelFileName, JSON.stringify(dataObject));
    return found;
}

module.exports.deleteItem = function(id) {
    let dataObject = JSON.parse(fs.readFileSync(modelFileName));
    let filtered = dataObject.items.filter(item => item.id != id);
    dataObject.items = filtered;
    fs.writeFileSync(modelFileName, JSON.stringify(dataObject));
}

module.exports.getAll = function() {
    return JSON.parse(fs.readFileSync(modelFileName)).items;
}