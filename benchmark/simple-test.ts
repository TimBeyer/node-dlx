// Simple benchmark script to test basic functionality
import Benchmark from 'benchmark'

console.log('Running a simplified benchmark test...')

const suite = new Benchmark.Suite()

suite
  .add('Array creation', function () {
    const arr = new Array(1000).fill(0)
    return arr.length
  })
  .add('Object creation', function () {
    const obj = { a: 1, b: 2, c: 3 }
    return Object.keys(obj).length
  })
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run()

console.log('Benchmark completed successfully!')
