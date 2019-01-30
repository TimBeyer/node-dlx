export interface Node<T> {
  left?: Node<T>
  right?: Node<T>
  up?: Node<T>
  down?: Node<T>
  col?: Column<T>
  index?: number
  data?: T
}

export interface Column<T> {
  head: Node<T>
  len: number
  prev?: Column<T>
  next?: Column<T>
}

export interface Row<T> {
  coveredColumns: number[]
  data: T
}

export interface Result<T> {
  data: T
  index: number
}
export type BinaryNumber = (0 | 1)

export interface SearchConfig<T = any> {
  numPrimary: number
  numSecondary: number
  numSolutions: number
  rows: Row<T>[]
}

export interface SimpleConstraint<T = any> {
  row: (1 | 0)[],
  data: T
}

export interface ComplexConstraint<T = any> {
  primaryRow: (1 | 0)[]
  secondaryRow: (1 | 0)[],
  data: T
}

export function isSimpleConstraint (arg: any): arg is SimpleConstraint {
  return arg.row !== undefined
}

export function isComplexConstraint (arg: any): arg is ComplexConstraint {
  return arg.primaryRow !== undefined && arg.secondaryRow !== undefined
}

export type Constraint<T = any> = SimpleConstraint<T> | ComplexConstraint<T>
