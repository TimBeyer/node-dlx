import Column from './column'

let searchMatrix = function searchMatrix (root: Column, findAll: boolean) {
  let chooseColumn = function () {
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

  let doSearch = function doSearch () {
    let objects = []
    let results = []
    let stopped = false;

    (function search (k) {
      if (root === root.right) {
        let result = []
        for (let i = 0; i < k; i++) {
          let o = objects[i]
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
      let currentColumnHeader
      let dataObject
      let neighbor

      currentColumnHeader = chooseColumn()
      currentColumnHeader.cover()

      dataObject = currentColumnHeader.down

      while (dataObject !== currentColumnHeader) {
        objects[k] = dataObject

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

        dataObject = dataObject.down
      }

      currentColumnHeader.uncover()

      return
    })(0)

    let result = findAll ? results : results[0]
    return result
  }

  return doSearch()
}

const findAll = function (column: Column) {
  return searchMatrix(column, true)
}

const findOne = function (column: Column) {
  return searchMatrix(column, false)
}
export {
  findAll,
  findOne
}
