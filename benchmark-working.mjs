import Benchmark from 'benchmark'
import { find, findRaw } from './built/lib/index.js'
import { getSearchConfig } from './built/lib/lib/utils.js'

// Sudoku test case from the original benchmark
const sudokuTestCase = '..............3.85..1.2.......5.7.....4...1...9.......5......73..2.1........4...9'

// Simple sudoku constraint generation (simplified version)
function generateSimpleSudokuConstraints() {
  const constraints = []
  
  // Generate a simple test case for 2x2 sudoku for performance testing
  const size = 2
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      for (let num = 1; num <= size; num++) {
        const constraint = {
          data: { row, col, num },
          primaryRow: new Array(12).fill(0), // 4 cells + 4 row + 4 col
          secondaryRow: []
        }
        
        // Cell constraint
        constraint.primaryRow[row * size + col] = 1
        // Row constraint
        constraint.primaryRow[4 + row * size + (num - 1)] = 1
        // Column constraint  
        constraint.primaryRow[8 + col * size + (num - 1)] = 1
        
        constraints.push(constraint)
      }
    }
  }
  
  return constraints
}

// Pentomino-like test case (simplified)
function generateSimplePentominoConstraints() {
  const constraints = []
  
  // Simple 3x3 grid with 2 pieces
  for (let piece = 0; piece < 2; piece++) {
    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 2; y++) {
        const constraint = {
          data: { piece, x, y },
          primaryRow: new Array(11).fill(0),
          secondaryRow: []
        }
        
        // Piece constraint
        constraint.primaryRow[piece] = 1
        // Position constraints
        constraint.primaryRow[2 + y * 3 + x] = 1
        constraint.primaryRow[2 + y * 3 + x + 1] = 1
        
        constraints.push(constraint)
      }
    }
  }
  
  return constraints
}

console.log('Benchmark: Dancing Links Algorithm Performance')
console.log('============================================\n')

const sudokuConstraints = generateSimpleSudokuConstraints()
const pentominoConstraints = generateSimplePentominoConstraints()

console.log(`Sudoku test: ${sudokuConstraints.length} constraints`)
console.log(`Pentomino test: ${pentominoConstraints.length} constraints\n`)

function benchmarkSudoku() {
  console.log('Benchmark: Sudoku solving (2x2)\n')
  
  const suite = new Benchmark.Suite()
  
  suite
    .add('dancing-links find (1 solution)', function () {
      find(sudokuConstraints, 1)
    })
    .add('dancing-links findRaw (1 solution)', function () {
      const config = getSearchConfig(1, sudokuConstraints)
      findRaw(config)
    })
    .on('cycle', function (event) {
      console.log(String(event.target))
    })
    .on('complete', function () {
      console.log('Fastest is ' + this.filter('fastest').map('name') + '\n\n')
    })
    .run()
}

function benchmarkPentomino() {
  console.log('Benchmark: Pentomino-like tiling\n')
  
  const suite = new Benchmark.Suite()
  
  suite
    .add('dancing-links find (all solutions)', function () {
      find(pentominoConstraints, Infinity)
    })
    .add('dancing-links findRaw (all solutions)', function () {
      const config = getSearchConfig(Infinity, pentominoConstraints)
      findRaw(config)
    })
    .on('cycle', function (event) {
      console.log(String(event.target))
    })
    .on('complete', function () {
      console.log('Fastest is ' + this.filter('fastest').map('name') + '\n\n')
    })
    .run()
}

// Run benchmarks
benchmarkSudoku()
benchmarkPentomino()

console.log('All benchmarks completed successfully!')