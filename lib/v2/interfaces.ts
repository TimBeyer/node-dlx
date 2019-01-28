export interface Node {
  left?: Node
  right?: Node
  up?: Node
  down?: Node
  col?: Column
}

export interface Column {
  head: Node
  len: number
  name: string
  prev?: Column
  next?: Column
}

export interface ComplexConstraint<T = any> {
  primaryRow: number[]
  secondaryRow: number[],
  data: T
}

export type Constraint<T = any> = ComplexConstraint<T>
