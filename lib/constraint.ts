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
