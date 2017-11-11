import DataObject from './data-object'
import Row from './row'
import Column from './column'
import * as _ from 'lodash'
import { isSimpleConstraint, isComplexConstraint, Constraint } from './constraint'

let createDataObjects = function createDataObjects (constraint: Constraint): DataObject[] {
  let primaryConstraints = []
  let secondaryConstraints = []

  if (isSimpleConstraint(constraint)) {
    primaryConstraints = _.map(constraint.row, function (isActive) {
      if (isActive) {
        let dataObject = new DataObject(constraint, false)
        return dataObject
      } else {
        return undefined
      }
    })
  } else if (isComplexConstraint(constraint)) {
    primaryConstraints = _.map(constraint.primaryRow, function (isActive) {
      if (isActive) {
        let dataObject = new DataObject(constraint, false)
        return dataObject
      } else {
        return undefined
      }
    })

    secondaryConstraints = _.map(constraint.secondaryRow || [], function (isActive) {
      if (isActive) {
        let dataObject = new DataObject(constraint, true)
        return dataObject
      } else {
        return undefined
      }
    })
  }

  return primaryConstraints.concat(secondaryConstraints)
}

let createMatrix = function createMatrix (constraints: Constraint[]) {
  let root = new Column()

  let headerRow = new Row(true)
  headerRow.append(root)

  let dataObjectRows = _.map(constraints, createDataObjects)
  let width = dataObjectRows[0].length
  let columnArray = _.map(_.range(0, width), function (index) {
    return _.compact(_.map(dataObjectRows, function (dataObjectRow) {
      return dataObjectRow[index]
    }))
  })

  let columns = _.map(columnArray, function (dataObjects) {
    let column = new Column(dataObjects[0].isOptional)
    _.each(dataObjects, column.append.bind(column))

    return column
  })

  _.each(columns, headerRow.append.bind(headerRow))

  _.each(dataObjectRows, function (dataObjectRow) {
    let dataObjects = _.compact(dataObjectRow)
    let row = new Row()
    _.each(dataObjects, row.append.bind(row))
  })

  return root
}

export default createMatrix
