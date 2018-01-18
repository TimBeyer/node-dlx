dancing-links
=============

[![Greenkeeper badge](https://badges.greenkeeper.io/TimBeyer/node-dlx.svg)](https://greenkeeper.io/)

About
-----

This is an implementation of Knuth's DLX to solve the exact cover problem.
I found that other libraries were either hard to use when having a lot of constraints, since there was no way to actually associate any kind of data with them, or had limited abilities in how to configure the search.  
For that reason, I chose to do a reimplementation, allowing you to add any kind of data to the constraints, find one or all solutions, and add optional constraints as you would need for example to solve the n-queens problem.

Usage
-----

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
 *      row: [1,0]
 *  },
 *  {
 *      data: 'second one',
 *      row: [0,1]
 *  }]
 */

var allSolutions = dlx.findAll(constraints);
/**
 * [[{
 *      data: 'first one',
 *     row: [1,0]
 *  },
 *  {
 *      data: 'second one',
 *      row: [0,1]
 *  }],
 *  [{
 *      data: 'first one',
 *      row: [1,0]
 *  },
 *  {
 *      data: 'third one',
 *      row: [0,1]
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
 *      primaryRow: [1,0],
 *      secondaryRow: [1]
 *  },
 *  {
 *      data: 'second one',
 *      primaryRow: [0,1],
 *      secondaryRow: [0]
 *  }]
 */

var allSolutions = dlx.findAll(constraints);
/**
 * 
 * Not the best example, but for brevity's sake believe me that it works as intended.
 *
 * [[{
 *      data: 'first one',
 *      primaryRow: [1,0],
 *      secondaryRow: [1]
 *  },
 *  {
 *      data: 'second one',
 *      primaryRow: [0,1],
 *      secondaryRow: [0]
 *  }]]
 */

