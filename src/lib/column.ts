
class Column {
  public isOptional: boolean

  public first: Column
  public last: Column

  public left: Column
  public right: Column

  public up: Column
  public down: Column

  public columnHeader: Column

  public size: number

  constructor (isOptional: boolean = false) {
    this.isOptional = isOptional

    this.first = this
    this.last = this

    this.left = this
    this.right = this
    this.up = this
    this.down = this
    this.columnHeader = this
    this.size = 0
  }

  cover () {
    // Unlink from column row
    this.right.left = this.left
    this.left.right = this.right

    let downNeighbor = this.down
    while (downNeighbor !== this) {
      let rightNeighbor = downNeighbor.right
      while (rightNeighbor !== downNeighbor) {
        // For every row downwards, unlink all nodes from their columns left to right
        rightNeighbor.down.up = rightNeighbor.up
        rightNeighbor.up.down = rightNeighbor.down

        this.size -= 1

        rightNeighbor = rightNeighbor.right
      }

      downNeighbor = downNeighbor.down
    }
  }

  uncover () {
    let upNeighbor = this.up
    while (upNeighbor !== this) {
      let leftNeighbor = upNeighbor.left
      while (leftNeighbor !== upNeighbor) {
        this.size += 1

        // For every row upwards, relink all nodes in their columns right to left
        leftNeighbor.down.up = leftNeighbor
        leftNeighbor.up.down = leftNeighbor

        leftNeighbor = leftNeighbor.left
      }
      upNeighbor = upNeighbor.up
    }

    // Relink column into row
    this.right.left = this
    this.left.right = this
  }

  append (column: Column) {
    this.last.down = column
    this.first.up = column

    column.up = this.last
    column.down = this.first

    column.columnHeader = this

    this.last = column
    this.size += 1

  }
}

export default Column
