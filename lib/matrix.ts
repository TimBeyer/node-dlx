import DataObject from './data-object'
import Row from './row'
import Column from './column'
import { isSimpleConstraint, isComplexConstraint, Constraint } from './constraint'

function createDataObjects (constraint: Constraint): Array<DataObject | undefined> {
  const constraints: Array<DataObject | undefined> = []

  if (isSimpleConstraint(constraint)) {
    for (const isActive of constraint.row) {
      if (isActive) {
        const dataObject = new DataObject(constraint, false)
        constraints.push(dataObject)
      } else {
        constraints.push(undefined)
      }
    }
  } else if (isComplexConstraint(constraint)) {
    for (const isActive of constraint.primaryRow) {
      if (isActive) {
        const dataObject = new DataObject(constraint, false)
        constraints.push(dataObject)
      } else {
        constraints.push(undefined)
      }
    }

    for (const isActive of constraint.secondaryRow) {
      if (isActive) {
        const dataObject = new DataObject(constraint, true)
        constraints.push(dataObject)
      } else {
        constraints.push(undefined)
      }
    }
  }

  return constraints
}

let createMatrix = function createMatrix (constraints: Constraint[]) {
  let root = new Column()

  let headerRow = new Row(true)
  headerRow.append(root)

  let dataObjectRows = constraints.map(createDataObjects)
  let width = dataObjectRows[0].length

  const columnArray = []

  for (let i = 0; i < width; i++) {
    const column = []

    for (const dataObjectRow of dataObjectRows) {
      const dataObject = dataObjectRow[i]
      if (dataObject) {
        column.push(dataObject)
      }
    }

    columnArray.push(column)
  }

  for (const dataObjects of columnArray) {
    const column = new Column(dataObjects[0].isOptional)
    for (const dataObject of dataObjects) {
      column.append(dataObject)
    }
    headerRow.append(column)
  }

  for (const dataObjects of dataObjectRows) {
    const row = new Row()
    for (const dataObject of dataObjects) {
      if (dataObject) {
        row.append(dataObject)
      }
    }
  }

  return root
}

export default createMatrix
