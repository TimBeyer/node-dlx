import * as Benchmark from 'benchmark'

import { createConstraints } from './n-queens'
import { findAll } from '../src'

const suite = new Benchmark.Suite()

console.log('Running benchmark, please wait...')

const constraints = createConstraints(8)

suite.add('solving 8 queens', function () {
  findAll(constraints)
})
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({ 'async': true })
