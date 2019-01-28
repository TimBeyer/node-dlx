import { Column, Node, Row, Result } from './interfaces'

enum SearchState {
  FORWARD,
  ADVANCE,
  BACKUP,
  RECOVER,
  DONE
}

export function search<T = any> (numSolutions, numPrimary, numSecondary, rows: Row<T>[]) {
  const root: Column = {} as Column

  const colArray = [root]
  const nodeArray = []
  const solutions: Result[][] = []

  let currentSearchState: SearchState = SearchState.FORWARD
  let running = true
  let level = 0
  let choice: Node[] = []
  let bestCol: Column
  let currentNode: Node

  function readColumnNames () {
    // Skip root node
    let curColIndex = 1

    for (let i = 0; i < numPrimary; i++) {
      const head: Node = {}
      head.up = head
      head.down = head

      const column: Column = {
        len: 0,
        head
      }

      column.prev = colArray[curColIndex - 1]
      colArray[curColIndex - 1].next = column

      colArray[curColIndex] = column
      curColIndex = curColIndex + 1
    }

    const lastCol = colArray[curColIndex - 1]
    // Link the last primary constraint to wrap back into the root
    lastCol.next = root
    root.prev = lastCol

    for (let i = 0; i < numSecondary; i++) {
      const head: Node = {}
      head.up = head
      head.down = head

      const column: Column = {
        head,
        len: 0
      }

      column.prev = column
      column.next = column

      colArray[curColIndex] = column
      curColIndex = curColIndex + 1
    }
  }

  function readRows () {
    let curNodeIndex = 0

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      let rowStart: Node = undefined

      for (const columnIndex of row.coveredColumns) {
        let node: Node = {}
        node.left = node
        node.right = node
        node.down = node
        node.up = node
        node.index = i
        node.data = row.data

        nodeArray[curNodeIndex] = node

        if (!rowStart) {
          rowStart = node
        } else {
          node.left = nodeArray[curNodeIndex - 1]
          nodeArray[curNodeIndex - 1].right = node
        }

        const col = colArray[columnIndex + 1]
        node.col = col

        node.up = col.head.up
        col.head.up.down = node

        col.head.up = node
        node.down = col.head

        col.len = col.len + 1
        curNodeIndex = curNodeIndex + 1
      }

      if (!rowStart) {
        throw new Error('Empty row')
      }

      rowStart.left = nodeArray[curNodeIndex - 1]
      nodeArray[curNodeIndex - 1].right = rowStart
    }
  }

  function cover (c: Column) {
    const l = c.prev
    const r = c.next

    // Unlink column
    l.next = r
    r.prev = l

    // From to to bottom, left to right unlink every row node from its column
    for (let rr = c.head.down; rr !== c.head; rr = rr.down) {
      for (let nn = rr.right; nn !== rr; nn = nn.right) {
        let uu = nn.up
        let dd = nn.down

        uu.down = dd
        dd.up = uu

        nn.col.len -= 1
      }
    }
  }

  function uncover (c: Column) {
    // From bottom to top, right to left relink every row node to its column
    for (let rr = c.head.up; rr !== c.head; rr = rr.up) {
      for (let nn = rr.left; nn !== rr; nn = nn.left) {
        let uu = nn.up
        let dd = nn.down

        uu.down = nn
        dd.up = nn

        nn.col.len += 1
      }
    }

    const l = c.prev
    const r = c.next

    // Unlink column
    l.next = c
    r.prev = c
  }

  function pickBestColum () {
    let lowestLen = root.next.len
    let lowest = root.next

    for (let curCol = root.next; curCol !== root; curCol = curCol.next) {
      let length = curCol.len
      if (length < lowestLen) {
        lowestLen = length
        lowest = curCol
      }
    }

    bestCol = lowest
  }

  function forward () {
    pickBestColum()
    cover(bestCol)

    currentNode = bestCol.head.down
    choice[level] = currentNode

    currentSearchState = SearchState.ADVANCE
  }

  function recordSolution () {
    let results: Result<T>[] = []
    for (let l = 0; l <= level; l++) {
      const node = choice[l]
      results.push({
        index: node.index,
        data: node.data
      })
    }

    solutions.push(results)
  }

  function advance () {
    if (currentNode === bestCol.head) {
      currentSearchState = SearchState.BACKUP
      return
    }

    for (let pp = currentNode.right; pp !== currentNode; pp = pp.right) {
      cover(pp.col)
    }

    if (root.next === root) {
      recordSolution()
      if (solutions.length === numSolutions) {
        currentSearchState = SearchState.DONE
      } else {
        currentSearchState = SearchState.RECOVER
      }
      return
    }

    level = level + 1
    currentSearchState = SearchState.FORWARD
  }

  function backup () {
    uncover(bestCol)

    if (level === 0) {
      currentSearchState = SearchState.DONE
      return
    }

    level = level - 1

    currentNode = choice[level]
    bestCol = currentNode.col

    currentSearchState = SearchState.RECOVER
  }

  function recover () {
    for (let pp = currentNode.left; pp !== currentNode; pp = pp.left) {
      uncover(pp.col)
    }
    currentNode = currentNode.down
    choice[level] = currentNode
    currentSearchState = SearchState.ADVANCE
  }

  function done () {
    running = false
  }

  const stateMethods = {
    [SearchState.FORWARD]: forward,
    [SearchState.ADVANCE]: advance,
    [SearchState.BACKUP]: backup,
    [SearchState.RECOVER]: recover,
    [SearchState.DONE]: done
  }

  readColumnNames()
  readRows()

  while (running) {
    const currentStateMethod = stateMethods[currentSearchState]
    currentStateMethod()
  }

  return solutions
}
