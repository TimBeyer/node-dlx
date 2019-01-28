import { Constraint, isComplexConstraint, isSimpleConstraint } from './lib/constraint'
import { search } from './lib/index'
import { binaryToSparseRow } from './lib/utils'
import { Row } from './lib/interfaces'

function getParams (constraint) {
  let numPrimary: number = 0
  let numSecondary: number = 0

  if (isSimpleConstraint(constraint)) {
    numPrimary = constraint.row.length
  } else if (isComplexConstraint(constraint)) {
    numPrimary = constraint.primaryRow.length
    numSecondary = constraint.secondaryRow.length
  }

  return {
    numPrimary,
    numSecondary
  }
}
const findAll = function (constraints: Constraint[]) {
  const { numPrimary, numSecondary } = getParams(constraints[0])
  const sparseConstraints: Row<any>[] = constraints.map((c) => {
    const data = c.data
    let coveredColumns: number[]
    if (isSimpleConstraint(c)) {
      coveredColumns = binaryToSparseRow(c.row)
    } else if (isComplexConstraint(c)) {
      coveredColumns = binaryToSparseRow(c.primaryRow).concat(binaryToSparseRow(c.secondaryRow, numPrimary))
    }

    return {
      data,
      coveredColumns
    }
  })

  return search(Infinity, numPrimary, numSecondary, sparseConstraints)
}

const findOne = function (constraints: Constraint[]) {
  const { numPrimary, numSecondary } = getParams(constraints[0])
  const sparseConstraints: Row<any>[] = constraints.map((c) => {
    const data = c.data
    let coveredColumns: number[]
    if (isSimpleConstraint(c)) {
      coveredColumns = binaryToSparseRow(c.row)
    } else if (isComplexConstraint(c)) {
      coveredColumns = binaryToSparseRow(c.primaryRow).concat(binaryToSparseRow(c.secondaryRow, numPrimary))
    }

    return {
      data,
      coveredColumns
    }
  })

  return search(1, numPrimary, numSecondary, sparseConstraints)
}

const find = function (constraints: Constraint[], numSolutions: number) {
  const { numPrimary, numSecondary } = getParams(constraints[0])
  const sparseConstraints: Row<any>[] = constraints.map((c) => {
    const data = c.data
    let coveredColumns: number[]
    if (isSimpleConstraint(c)) {
      coveredColumns = binaryToSparseRow(c.row)
    } else if (isComplexConstraint(c)) {
      coveredColumns = binaryToSparseRow(c.primaryRow).concat(binaryToSparseRow(c.secondaryRow, numPrimary))
    }

    return {
      data,
      coveredColumns
    }
  })

  return search(numSolutions, numPrimary, numSecondary, sparseConstraints)
}

export {
  findOne,
  findAll,
  find
}
