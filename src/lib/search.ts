import Column from './column'
import DataObject from './data-object'
import { Constraint } from './constraint'

interface SearchState {
  neighbor: Column
  currentColumnHeader: Column
  dataObject: DataObject
}

function cover (searchState: SearchState, dataObject: DataObject): void {
  let neighbor = dataObject.right
  while (neighbor !== dataObject) {
    neighbor.columnHeader.cover()
    neighbor = neighbor.right
  }
  searchState.neighbor = neighbor
}

function uncover (searchState: SearchState, dataObject: DataObject): void {

  let neighbor = searchState.neighbor.left

  while (neighbor !== dataObject) {
    neighbor.columnHeader.uncover()
    neighbor = neighbor.left
  }

  searchState.neighbor = neighbor
}

type SearchStates = ('enterSearch' | 'goDown' | 'goUp')

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
  let searchState: SearchStates = 'enterSearch'

  let stopped = false

  let k = 0
  let stateStack: SearchState[] = []
  let currentState: SearchState

  mainLoop:
  while (!stopped) {
    switch (searchState as SearchStates) {
      case 'enterSearch': {
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

          searchState = 'goUp'
        } else {
          const currentColumnHeader = chooseColumn()
          const dataObject = currentColumnHeader.down as DataObject

          currentState = {
            neighbor: undefined,
            currentColumnHeader,
            dataObject
          }

          currentState.currentColumnHeader.cover()
          searchState = 'goDown'
        }
        continue mainLoop
      }
      case 'goDown': {
        if (currentState.dataObject !== currentState.currentColumnHeader) {
          objects[k] = currentState.dataObject as DataObject

          cover(currentState, currentState.dataObject)

          k = k + 1

          stateStack.push({
            ...currentState
          })

          searchState = 'enterSearch'
        } else {
          currentState.currentColumnHeader.uncover()
          searchState = 'goUp'
        }
        continue mainLoop
      }
      case 'goUp': {
        k = k - 1

        if (k < 0) {
          stopped = true
          continue
        }

        currentState = stateStack.pop()

        currentState.dataObject = objects[k]
        currentState.currentColumnHeader = currentState.dataObject.columnHeader

        uncover(currentState, currentState.dataObject)

        currentState.dataObject = currentState.dataObject.down as DataObject

        searchState = 'goDown'

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
