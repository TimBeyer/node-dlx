var Row = function (isHeaderRow) {
    this.first = undefined;
    this.last = undefined;
    this.isHeaderRow = isHeaderRow || false;
};

Row.prototype.append = function append (dataObject) {
    if (this.isHeaderRow && dataObject.isOptional) {
        dataObject.left = dataObject;
        dataObject.right = dataObject;
    }
    else {
        if (!this.first) {
            this.first = dataObject;
        }
        if (!this.last) {
            this.last = dataObject;
        }

        this.last.right = dataObject;
        this.first.left = dataObject;

        dataObject.left = this.last;
        dataObject.right = this.first;        

        this.last = dataObject;

    }

};

module.exports = Row;
