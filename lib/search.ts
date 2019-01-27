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

  function recordResult () {
    const result = []

    for (let i = 0; i < k; i++) {
      const o = objects[i]
      result.push(o.data)
    }

    results.push(result)
  }

  function initSearch () {
    currentColumnHeader = chooseColumn()
    dataObject = currentColumnHeader.down as DataObject
    currentColumnHeader.cover()
  }

  function cover () {
    objects[k] = dataObject as DataObject

    neighbor = dataObject.right

    while (neighbor !== dataObject) {
      neighbor.columnHeader.cover()
      neighbor = neighbor.right
    }
  }

  function uncover () {
    dataObject = objects[k]
    currentColumnHeader = dataObject.columnHeader

    neighbor = neighbor.left

    while (neighbor !== dataObject) {
      neighbor.columnHeader.uncover()
      neighbor = neighbor.left
    }

    dataObject = dataObject.down as DataObject
  }

  function pushState () {
    neighborStack.push(neighbor)
    dataObjectStack.push(dataObject)
    currentColumnHeaderStack.push(currentColumnHeader)
  }

  function popState () {
    neighbor = neighborStack.pop()
    dataObject = dataObjectStack.pop()
    currentColumnHeader = currentColumnHeaderStack.pop()
  }

  while (!stopped) {
    if (searchState === SearchState.ENTER_SEARCH) {
      const isSolution = root === root.right

      if (isSolution) {
        recordResult()

        if (results.length === limit) {
          stopped = true
        }

        searchState = SearchState.GO_UP
      } else {

        initSearch()
        searchState = SearchState.GO_DOWN
      }
      continue
    } else if (searchState === SearchState.GO_DOWN) {
      if (dataObject !== currentColumnHeader) {
        cover()
        pushState()
        k = k + 1

        searchState = SearchState.ENTER_SEARCH
      } else {
        currentColumnHeader.uncover()
        searchState = SearchState.GO_UP
      }

      continue
    } else if (searchState === SearchState.GO_UP) {
      k = k - 1

      if (k < 0) {
        stopped = true
        continue
      }

      popState()
      uncover()

      searchState = SearchState.GO_DOWN

      continue
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
