export interface Node<T = any> {
  left?: Node
  right?: Node
  up?: Node
  down?: Node
  col?: Column
  index?: number
  data?: T
}

export interface Column {
  head: Node
  len: number
  prev?: Column
  next?: Column
}

export interface Row<T = any> {
  coveredColumns: number[]
  data: T
}

export interface Result<T = any> {
  data: T
  index: number
}
export type BinaryNumber = (0 | 1)

export interface Constraint<T = any> {
  primaryRow: BinaryNumber[]
  secondaryRow: BinaryNumber[]
  data: T
}
