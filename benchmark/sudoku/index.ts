import { SimpleConstraint, Row, Result } from '../../lib/interfaces'

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

function generateConstraints (size = 9, inputs: SudokuInput[] = []): MultiConstraint<SudokuInput>[] {
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
      const matchingInput = inputs.find((i) => i.colIndex === currentCol && i.rowIndex === currentRow)

      for (let currentNumber = 0; currentNumber < size; currentNumber ++) {
        if (matchingInput) {
          // Internally we index with zero, but numbers start at 1
          if (matchingInput.number !== currentNumber + 1) {
            // If we have an input for this row/col we need to skip all other options
            continue
          }
        }
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

function printBoard (size = 9, inputs: SudokuInput[]): string {
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

function parseStringFormat (size = 9, dotFormat: string) {
  const inputs: SudokuInput[] = []

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const index = size * row + col
      const cell = dotFormat[index]
      if (cell !== '.' && cell !== '0') {
        inputs.push({
          rowIndex: row,
          colIndex: col,
          number: Number(cell)
        })
      }
    }
  }

  return inputs
}

function logResults (size = 9, results: Result<SudokuInput>[][]) {
  console.log(results.map((s) => s.map((c) => c.data)).map((s) => printBoard(size, s)).join('\n\n'))
}

logResults(9, find(generateConstraints(9, parseStringFormat(9, '000004009050120000000000085009076400020080306005400000090000100000090007060032900')), 5))
