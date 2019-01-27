import Column from './column'

class Row {
  public isHeaderRow: boolean
  public first: Column
  public last: Column

  constructor (isHeaderRow: boolean = false) {
    this.isHeaderRow = isHeaderRow
  }

  append (column: Column) {
    if (this.isHeaderRow && column.isOptional) {
      column.left = column
      column.right = column
    } else {
      if (!this.first) {
        this.first = column
      }
      if (!this.last) {
        this.last = column
      }

      this.last.right = column
      this.first.left = column

      column.left = this.last
      column.right = this.first

      this.last = column

    }
  }
}

export default Row
