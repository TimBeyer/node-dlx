export interface SimpleConstraint {
  row: number[],
  data: any
}

export interface ComplexConstraint {
  primaryRow: number[]
  secondaryRow: number[],
  data: any
}

export function isSimpleConstraint (arg: any): arg is SimpleConstraint {
  return arg.row !== undefined
}

export function isComplexConstraint (arg: any): arg is ComplexConstraint {
  return arg.primaryRow !== undefined && arg.secondaryRow !== undefined
}

export type Constraint = SimpleConstraint | ComplexConstraint
