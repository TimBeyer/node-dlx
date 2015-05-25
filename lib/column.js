var Column = function (name, isOptional) {
    this.type = 'Column';

    this.isOptional = isOptional || false;
    
    this.first = this;
    this.last = this;

    this.name = name;
    this.left = this;
    this.right = this;
    this.up = this;
    this.down = this;
    this.columnHeader = this;
    this.size = 0;
};

Column.prototype.cover = function cover () {

    // Unlink from column row
    this.right.left = this.left;
    this.left.right = this.right;

    var downNeighbor = this.down;
    while (downNeighbor !== this) {
        var rightNeighbor = downNeighbor.right;
        while (rightNeighbor !== downNeighbor) {
            // For every row downwards, unlink all nodes from their columns left to right
            rightNeighbor.down.up = rightNeighbor.up;
            rightNeighbor.up.down = rightNeighbor.down;

            this.size -= 1;

            rightNeighbor = rightNeighbor.right;
        }

        downNeighbor = downNeighbor.down;
    }
};

Column.prototype.uncover = function uncover () {

    var upNeighbor = this.up;
    while (upNeighbor !== this) {
        var leftNeighbor = upNeighbor.left;
        while (leftNeighbor !== upNeighbor) {
            this.size += 1;

            // For every row upwards, relink all nodes in their columns right to left
            leftNeighbor.down.up = leftNeighbor;
            leftNeighbor.up.down = leftNeighbor;

            leftNeighbor = leftNeighbor.left;
        }
        upNeighbor = upNeighbor.up;
    }

    // Relink column into row
    this.right.left = this;
    this.left.right = this;
};

Column.prototype.append = function append (dataObject) {
    this.last.down = dataObject;
    this.first.up = dataObject;

    dataObject.up = this.last;
    dataObject.down = this.first;

    dataObject.columnHeader = this;

    this.last = dataObject;
    this.size += 1;

};

module.exports = Column;
