import { findAll } from '../../index.js'
import { SimpleConstraint, ComplexConstraint } from '../../lib/interfaces.js'
import { expect } from 'chai'

describe('search', function () {
  describe('when searching for all solutions with mandatory constraints', function () {
    it('returns them all', function () {
      const constraints: SimpleConstraint<number>[] = [
        {
          data: 0,
          row: [1, 0, 0]
        },
        {
          data: 1,
          row: [0, 1, 0]
        },
        {
          data: 2,
          row: [0, 0, 1]
        },
        {
          data: 3,
          row: [1, 0, 1]
        }
      ]

      const solutions = findAll(constraints)

      const data = solutions.map(function (solution) {
        return solution.map(s => s.data)
      })

      expect(data[0]?.sort()).to.eql([0, 1, 2])
      expect(data[1]?.sort()).to.eql([1, 3])
    })
  })

  describe('when searching for all solutions with optional constraints', function () {
    it('returns them all', function () {
      const constraints: ComplexConstraint<number>[] = [
        {
          data: 0,
          primaryRow: [1, 0, 0],
          secondaryRow: [0]
        },
        {
          data: 1,
          primaryRow: [0, 1, 0],
          secondaryRow: [1]
        },
        {
          data: 2,
          primaryRow: [0, 0, 1],
          secondaryRow: [0]
        },
        {
          data: 3,
          primaryRow: [1, 0, 1],
          secondaryRow: [1]
        }
      ]

      const solutions = findAll(constraints)

      const data = solutions.map(function (solution) {
        return solution.map(s => s.data)
      })

      expect(data.length).to.eql(1)
      expect(data[0]?.sort()).to.eql([0, 1, 2])
    })
  })
})
