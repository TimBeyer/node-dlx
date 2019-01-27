import Column from './column'
import { Constraint } from './constraint'

class DataObject extends Column {
  public data: Constraint

  constructor (data: Constraint, isOptional: boolean = false) {
    super(isOptional)
    this.data = data
  }
}

export default DataObject
