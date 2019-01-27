export interface SimpleConstraint<T = any> {
  row: number[],
  data: T
}

export interface ComplexConstraint<T = any> {
  primaryRow: number[]
  secondaryRow: number[],
  data: T
}

export function isSimpleConstraint (arg: any): arg is SimpleConstraint {
  return arg.row !== undefined
}

export function isComplexConstraint (arg: any): arg is ComplexConstraint {
  return arg.primaryRow !== undefined && arg.secondaryRow !== undefined
}

export type Constraint<T = any> = SimpleConstraint<T> | ComplexConstraint<T>
