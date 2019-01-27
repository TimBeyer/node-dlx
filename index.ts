import { Constraint } from './lib/constraint'
import matrix from './lib/matrix'
import * as search from './lib/search'

const findAll = function (constraints: Constraint[]) {
  return search.findAll(matrix(constraints))
}

const findOne = function (constraints: Constraint[]) {
  return search.findOne(matrix(constraints))
}

const find = function (constraints: Constraint[], numSolutions: number) {
  return search.find(matrix(constraints), numSolutions)
}

export {
  findOne,
  findAll,
  find
}
