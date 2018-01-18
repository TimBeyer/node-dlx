interface SimpleConstraint {
  row: number[],
  data: any
}

interface ComplexConstraint {
  primaryRow: number[]
  secondaryRow: number[],
  data: any
}

function isSimpleConstraint (arg: any): arg is SimpleConstraint {
  return arg.row !== undefined
}

function isComplexConstraint (arg: any): arg is ComplexConstraint {
  return arg.primaryRow !== undefined && arg.secondaryRow !== undefined
}

type Constraint = SimpleConstraint | ComplexConstraint

export {
  Constraint as default,
  Constraint,
  isSimpleConstraint,
  isComplexConstraint,
  SimpleConstraint,
  ComplexConstraint
}
