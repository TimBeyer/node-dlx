# dancing-links [![codecov](https://codecov.io/gh/TimBeyer/node-dlx/branch/master/graph/badge.svg)](https://codecov.io/gh/TimBeyer/node-dlx)

## About

This is an implementation of Knuth's DLX to solve the exact cover problem.
It is a port of [Knuth's literate dancing links implementation](https://cs.stanford.edu/~knuth/programs/dance.w) and supports primary and secondary constraints, and returning custom data instead of pure row indices.

There are no external dependencies and there is full typescript support.

It is currently [the fastest](#benchmarks) Dancing Links implementation in JS.

## Usage

```javascript

var dlx = require('dancing-links');

// Simple case
var constraints = [
    {
        data: 'first one',
        row: [1,0]
    },
    {
        data: 'second one',
        row: [0,1]
    },
    {
        data: 'third one',
        row: [0,1]
    }
];

var oneSolution = dlx.findOne(constraints);
/**
 * [{
 *      data: 'first one',
 *      index: 0
 *  },
 *  {
 *      data: 'second one',
 *      index: 1
 *  }]
 */

var allSolutions = dlx.findAll(constraints);
/**
 * [[{
 *      data: 'first one',
 *      index: 0
 *  },
 *  {
 *      data: 'second one',
 *      index: 1
 *  }],
 *  [{
 *      data: 'first one',
 *      index: 0
 *  },
 *  {
 *      data: 'third one',
 *      index: 2
 *  }]]
 */

// Secondary constraints

var constraints = [
    {
        data: 'first one',
        primaryRow: [1,0],
        secondaryRow: [1]
    },
    {
        data: 'second one',
        primaryRow: [0,1],
        secondaryRow: [0]
    },
    {
        data: 'third one',
        primaryRow: [0,1],
        secondaryRow: [1]
    }
];

var oneSolution = dlx.findOne(constraints);
/**
 * [{
 *      data: 'first one',
 *      index: 0
 *  },
 *  {
 *      data: 'second one',
 *      index: 1,
 *  }]
 */

var allSolutions = dlx.findAll(constraints);
/**
 * 
 * Not the best example, but for brevity's sake believe me that it works as intended.
 *
 * [{
 *      data: 'first one',
 *      index: 0
 *  },
 *  {
 *      data: 'second one',
 *      index: 1,
 *  }]
 */
```

## Implementation

Previously, this library was directly based on the [original DLX paper](https://arxiv.org/pdf/cs/0011047.pdf) and implemented using recursion.  
However, in order to improve performance and align with [Knuth's reference implementation](https://cs.stanford.edu/~knuth/programs/dance.w), the algorithm needed to be converted to an iteration.

Since JS does not support the `goto` statement, and since it's considered harmful anyway, the implementation uses a very simple state machine to execute the algorithm.


## Benchmarks

The benchmarks were done against [dlxlib](https://github.com/taylorjg/dlxlibjs) and [dance](https://github.com/wbyoung/dance) using constraints for a 6x10 [pentomino](https://en.wikipedia.org/wiki/Pentomino) tiling.

You can run them with `npm run benchmark`

```
Benchmark: Finding one pentomino tiling on a 6x10 field

dancing-links findOne x 210 ops/sec ±8.36% (80 runs sampled)
dancing-links findRaw x 247 ops/sec ±2.36% (84 runs sampled)
dlxlib x 69.08 ops/sec ±2.35% (72 runs sampled)
dance x 35.40 ops/sec ±2.66% (63 runs sampled)
Fastest is dancing-links findRaw


Benchmark: Finding ten pentomino tilings on a 6x10 field

dancing-links findOne x 37.41 ops/sec ±3.40% (52 runs sampled)
dancing-links findRaw x 39.29 ops/sec ±3.56% (52 runs sampled)
dlxlib x 11.15 ops/sec ±3.48% (32 runs sampled)
dance x 7.05 ops/sec ±3.89% (23 runs sampled)

Fastest is dancing-links findRaw


Benchmark: Finding one hundred pentomino tilings on a 6x10 field

dancing-links findOne x 5.28 ops/sec ±9.90% (18 runs sampled)
dancing-links findRaw x 5.56 ops/sec ±2.41% (18 runs sampled)
dlxlib x 1.63 ops/sec ±1.08% (9 runs sampled)
dance x 1.08 ops/sec ±0.87% (7 runs sampled)

Fastest is dancing-links findRaw
```
