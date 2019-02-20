import { SimpleConstraint, Row } from '../../lib/interfaces'

import { find, findRaw } from '../..'

type MultiConstraint<T> = SimpleConstraint<T> & Row<T>

interface SudokuInput {
  number: number
  rowIndex: number
  colIndex: number
}

function times<T> (n: number, fn: () => T): T[] {
  const returnValue: T[] = []

  for (let i = 0; i < n; i++) {
    returnValue.push(fn())
  }

  return returnValue
}

function generateConstraints (size = 9): MultiConstraint<SudokuInput>[] {
  const blockSize = Math.sqrt(size)
  // each of the numbers can be in any x|y just once
  const numRowColConstraints = size * size
  // each of the numbers can be in any row just once
  const numRowConstraints = size * size
  // each of the numbers can be in any col just once
  const numColConstraints = size * size
  // each of the numbers can be in any block just once
  const numBlockConstraints = size * size

  const constraints: MultiConstraint<SudokuInput>[] = []

  const allIndexes = []
  for (let currentRow = 0; currentRow < size; currentRow++) {
    for (let currentCol = 0; currentCol < size; currentCol++) {
      for (let currentNumber = 0; currentNumber < size; currentNumber ++) {
        // The matrix rows go in the order
        // [...rowColConstraints, ...rowConstraints, ...colConstraints, ...blockConstraints]
        const numberOffset = (currentNumber * size)
        const rowColNumber = size * currentRow + currentCol
        const rowColIndex = rowColNumber

        const rowIndex = numRowColConstraints + numberOffset + currentRow
        const colIndex = numRowColConstraints + numRowConstraints + numberOffset + currentCol

        const blockRow = Math.floor(currentRow / blockSize)
        const blockCol = Math.floor(currentCol / blockSize)
        const blockNumber = blockSize * blockRow + blockCol

        const blockIndex = numRowColConstraints + numRowConstraints + numColConstraints + (numberOffset + blockNumber)

        const row = times(numRowColConstraints + numRowConstraints + numColConstraints + numBlockConstraints, () => 0) as (1 | 0)[]

        row[rowColIndex] = 1
        row[rowIndex] = 1
        row[colIndex] = 1
        row[blockIndex] = 1

        allIndexes[rowColIndex] = 1
        allIndexes[rowIndex] = 1
        allIndexes[colIndex] = 1
        allIndexes[blockIndex] = 1

        constraints.push({
          row: row,
          coveredColumns: [rowColIndex, rowIndex, colIndex, blockIndex],
          data: {
            number: currentNumber + 1,
            rowIndex: currentRow,
            colIndex: currentCol
          }
        })
      }
    }
  }

  return constraints
}

function printBoard (inputs: SudokuInput[], size = 9): string {
  const rows: string[][] = times(size, () => times(size, () => ' '))

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      rows[y][x] = String(inputs.find((input) => input.colIndex === x && input.rowIndex === y).number)
    }
  }

  const joinedRows = rows.map((row) => row.join('|'))
  const board = joinedRows.join('\n')

  return board
}

// console.log(generateConstraints().map((c) => `R${c.data.rowIndex}C${c.data.colIndex}#${c.data.number} ${c.row.join('')}`).join('\n'))
console.log(find(generateConstraints(9), 5).map((s) => s.map((c) => c.data)).map((s) => printBoard(s, 9)).join('\n\n'))
