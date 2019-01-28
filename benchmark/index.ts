import * as Benchmark from 'benchmark'
import * as dlxlib from 'dlxlib'
import * as dance from 'dance'

// import { createConstraints } from './n-queens'
import { find, findRaw } from '..'
import { ALL_CONSTRAINTS } from './pentomino/field'
import { getSearchConfig } from '../lib/utils'

function benchmarkOneTiling () {
  console.log('Benchmark: Finding one pentomino tiling on a 6x10 field\n')

  const dlxlibConstraints = ALL_CONSTRAINTS.map((constraint) => constraint.row)
  const searchConfig = getSearchConfig(1, ALL_CONSTRAINTS)

  const suite = new Benchmark.Suite()

  suite.add('node-dlx findOne', function () {
    find(ALL_CONSTRAINTS, 1)
  }).add('node-dlx findRaw', function () {
    findRaw(searchConfig)
  }).add('dlxlib', function () {
    dlxlib.solve(dlxlibConstraints, null, null, 1)
  }).add('dance', function () {
    dance.solve(dlxlibConstraints, {
      maxSolutions: 1
    })
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name') + '\n\n')
  }).run()
}

function benchmarkTenTilings () {
  console.log('Benchmark: Finding ten pentomino tilings on a 6x10 field\n')

  const dlxlibConstraints = ALL_CONSTRAINTS.map((constraint) => constraint.row)
  const searchConfig = getSearchConfig(10, ALL_CONSTRAINTS)

  const suite = new Benchmark.Suite()

  suite.add('node-dlx findOne', function () {
    find(ALL_CONSTRAINTS, 10)
  }).add('node-dlx findRaw', function () {
    findRaw(searchConfig)
  }).add('dlxlib', function () {
    dlxlib.solve(dlxlibConstraints, null, null, 10)
  }).add('dance', function () {
    dance.solve(dlxlibConstraints, {
      maxSolutions: 10
    })
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('\nFastest is ' + this.filter('fastest').map('name') + '\n\n')
  }).run()
}

benchmarkOneTiling()
benchmarkTenTilings()
