type BinaryInt = 0 | 1

export function binaryToSparseRow (binaryRow: BinaryInt[]): number[] {
  const sparseRow: number[] = []

  for (let i = 0; i < binaryRow.length; i++) {
    if (binaryRow[i] === 1) {
      sparseRow.push(i)
    }
  }

  return sparseRow
}
