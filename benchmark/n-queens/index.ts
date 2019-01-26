import { createEncoder } from './encoder'

export function createConstraints (fieldSize: number) {
  const encode = createEncoder(fieldSize)
  const constraints = []

  for (let x = 0; x < fieldSize; x++) {
    for (let y = 0; y < fieldSize; y++) {
      constraints.push(encode(x, y))
    }
  }

  return constraints
}
