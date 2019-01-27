import Column from './column'
import DataObject from './data-object'
import { Constraint } from './constraint'

enum SearchState {
  'ENTER_SEARCH',
  'GO_DOWN',
  'GO_UP'
}

let searchMatrix = function searchMatrix (root: Column, limit: number = Infinity): Constraint[][] {
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

  const objects: DataObject[] = []
  const results: Constraint[][] = []
  let searchState: SearchState = SearchState.ENTER_SEARCH

  let stopped = false

  let k = 0

  let neighborStack: Column[] = []
  let neighbor: Column

  let currentColumnHeaderStack: Column[] = []
  let currentColumnHeader: Column

  let dataObjectStack: DataObject[] = []
  let dataObject: DataObject

  mainLoop:
  while (!stopped) {
    switch (searchState as SearchState) {
      case SearchState.ENTER_SEARCH: {
        const isSolution = root === root.right

        if (isSolution) {
          const result = []

          for (let i = 0; i < k; i++) {
            const o = objects[i]
            result.push(o.data)
          }

          results.push(result)

          if (results.length === limit) {
            stopped = true
          }

          searchState = SearchState.GO_UP
        } else {
          currentColumnHeader = chooseColumn()
          dataObject = currentColumnHeader.down as DataObject
          currentColumnHeader.cover()

          searchState = SearchState.GO_DOWN
        }
        continue mainLoop
      }
      case SearchState.GO_DOWN: {
        if (dataObject !== currentColumnHeader) {
          objects[k] = dataObject as DataObject

          neighbor = dataObject.right

          while (neighbor !== dataObject) {
            neighbor.columnHeader.cover()
            neighbor = neighbor.right
          }

          k = k + 1

          neighborStack.push(neighbor)
          dataObjectStack.push(dataObject)
          currentColumnHeaderStack.push(currentColumnHeader)

          searchState = SearchState.ENTER_SEARCH
        } else {
          currentColumnHeader.uncover()
          searchState = SearchState.GO_UP
        }
        continue mainLoop
      }
      case SearchState.GO_UP: {
        k = k - 1

        if (k < 0) {
          stopped = true
          continue
        }

        neighbor = neighborStack.pop()
        dataObject = dataObjectStack.pop()
        currentColumnHeader = currentColumnHeaderStack.pop()

        dataObject = objects[k]
        currentColumnHeader = dataObject.columnHeader

        neighbor = neighbor.left

        while (neighbor !== dataObject) {
          neighbor.columnHeader.uncover()
          neighbor = neighbor.left
        }

        dataObject = dataObject.down as DataObject
        searchState = SearchState.GO_DOWN

        continue mainLoop
      }
    }
  }

  return results
}

const find = function (column: Column, numResults: number): Constraint[][] {
  return searchMatrix(column, numResults)
}

const findAll = function (column: Column): Constraint[][] {
  return searchMatrix(column)
}

const findOne = function (column: Column): Constraint[] {
  const result = searchMatrix(column, 1)

  return result[0]
}

export {
  findAll,
  find,
  findOne
}
