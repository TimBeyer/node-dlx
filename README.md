# dancing-links [![codecov](https://codecov.io/gh/TimBeyer/node-dlx/branch/master/graph/badge.svg)](https://codecov.io/gh/TimBeyer/node-dlx)

## About

This is an implementation of Knuth's DLX to solve the exact cover problem.
It is a port of [Knuth's literate dancing links implementation](https://cs.stanford.edu/~knuth/programs/dance.w) and supports primary and secondary constraints, and returning custom data in addition to row indices.

There are no external dependencies and there is full typescript support.

It is currently [the fastest](#benchmarks) Dancing Links implementation in JS.

## Usage

```javascript

const dlx = require('dancing-links')

// Simple case
const constraints = [
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
]

const oneSolution = dlx.findOne(constraints)
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

const allSolutions = dlx.findAll(constraints)
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

const constraints = [
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
]

const oneSolution = dlx.findOne(constraints)
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

const allSolutions = dlx.findAll(constraints)
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
Benchmark: A solution to the sodoku

.|.|.|.|.|.|.|.|.
.|.|.|.|.|3|.|8|5
.|.|1|.|2|.|.|.|.
.|.|.|5|.|7|.|.|.
.|.|4|.|.|.|1|.|.
.|9|.|.|.|.|.|.|.
5|.|.|.|.|.|.|7|3
.|.|2|.|1|.|.|.|.
.|.|.|.|4|.|.|.|9

dancing-links find x 2,247 ops/sec ±2.19% (89 runs sampled)
dancing-links findRaw x 4,975 ops/sec ±1.59% (93 runs sampled)
dlxlib x 390 ops/sec ±1.04% (88 runs sampled)
dance x 400 ops/sec ±0.75% (87 runs sampled)
dancing-links-algorithm x 447 ops/sec ±1.50% (86 runs sampled)
Fastest is dancing-links findRaw


Benchmark: Finding one pentomino tiling on a 6x10 field

dancing-links find x 231 ops/sec ±2.60% (85 runs sampled)
dancing-links findRaw x 249 ops/sec ±0.83% (84 runs sampled)
dlxlib x 66.70 ops/sec ±1.90% (70 runs sampled)
dance x 37.58 ops/sec ±1.05% (65 runs sampled)
Fastest is dancing-links findRaw


Benchmark: Finding ten pentomino tilings on a 6x10 field

dancing-links find x 38.64 ops/sec ±1.49% (52 runs sampled)
dancing-links findRaw x 37.77 ops/sec ±3.22% (50 runs sampled)
dlxlib x 10.54 ops/sec ±1.98% (30 runs sampled)
dance x 7.75 ops/sec ±2.41% (24 runs sampled)

Fastest is dancing-links findRaw


Benchmark: Finding one hundred pentomino tilings on a 6x10 field

dancing-links find x 5.18 ops/sec ±11.43% (17 runs sampled)
dancing-links findRaw x 5.42 ops/sec ±1.20% (18 runs sampled)
dlxlib x 1.50 ops/sec ±0.69% (8 runs sampled)
dance x 1.15 ops/sec ±2.04% (7 runs sampled)

Fastest is dancing-links findRaw
```

## Profiling

You can generate a CPU profile of the algorithm using `npm run benchmark`.
It will create a file called `profile.cpuprofile` which you can then load into the Chrome inspector.
To do this, you will need to install the optional dependency `v8-profiler` manually using `npm install v8-profiler`.  
This is because there isn't currently a way to specify optional dev dependencies, and as a dev dependency compiling of the dependency fails in CI.

## Examples

The [benchmark directory](https://github.com/TimBeyer/node-dlx/tree/master/benchmark) implements encoders for the n-queens and pentomino tiling problems.  
They aren't very optimized (the pentomino tiling does not consider symmetries) but you can use them as examples for how to encode your constraints for the library.
