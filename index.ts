import { Constraint, SearchConfig } from './lib/interfaces'
import { search } from './lib/index'

import { getSearchConfig } from './lib/utils'

export function findAll<T = any> (constraints: Constraint<T>[]) {
  return search<T>(getSearchConfig(Infinity, constraints))
}

export function findOne<T = any> (constraints: Constraint<T>[]) {
  return search<T>(getSearchConfig(1, constraints))
}

export function find<T = any> (constraints: Constraint<T>[], numSolutions: number) {
  return search<T>(getSearchConfig(numSolutions, constraints))
}

export function findRaw<T = any> (config: SearchConfig<T>) {
  return search<T>(config)
}

export { Constraint, SimpleConstraint, ComplexConstraint, SearchConfig, Row } from './lib/interfaces'
