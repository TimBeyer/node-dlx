var type = 'DataObject';

var DataObject = function (data, isOptional) {
    this.data = data;
    this.isOptional = isOptional || false;
};

DataObject.prototype.type = type;
DataObject.type = type;

module.exports = DataObject;
