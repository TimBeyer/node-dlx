import Column from './column'
import DataObject from './data-object'
import { Constraint } from './constraint'

let searchMatrix = function searchMatrix (root: Column, findAll: boolean) {
  function chooseColumn () {
    let smallestColumn = root.right
    let currentColumn = root.right

    while (currentColumn !== root) {
      if (currentColumn.size < smallestColumn.size) {
        smallestColumn = currentColumn
      }
      currentColumn = currentColumn.right
    }

    return smallestColumn
  }

  function doSearch () {
    const objects: DataObject[] = []
    const results: Constraint[][] = []
    let stopped = false;

    (function search (k) {
      if (root === root.right) {
        const result = []

        for (let i = 0; i < k; i++) {
          const o = objects[i]
          result.push(o.data)
        }

        results.push(result)

        if (!findAll) {
          stopped = true
        }

        return
      }

      if (stopped) {
        return
      }

      let currentColumnHeader: Column
      let dataObject: DataObject
      let neighbor: Column

      currentColumnHeader = chooseColumn()
      currentColumnHeader.cover()

      dataObject = currentColumnHeader.down as DataObject

      while (dataObject !== currentColumnHeader) {
        objects[k] = dataObject as DataObject
        neighbor = dataObject.right

        while (neighbor !== dataObject) {
          neighbor.columnHeader.cover()
          neighbor = neighbor.right
        }

        if (!stopped) {
          search(k + 1)
        }

        dataObject = objects[k]
        currentColumnHeader = dataObject.columnHeader

        neighbor = neighbor.left

        while (neighbor !== dataObject) {
          neighbor.columnHeader.uncover()
          neighbor = neighbor.left
        }

        dataObject = dataObject.down as DataObject
      }

      currentColumnHeader.uncover()

      return
    })(0)

    return results
  }

  return doSearch()
}

const findAll = function (column: Column): Constraint[][] {
  return searchMatrix(column, true)
}

const findOne = function (column: Column): Constraint[] {
  const result = searchMatrix(column, false)

  return result[0]
}

export {
  findAll,
  findOne
}
