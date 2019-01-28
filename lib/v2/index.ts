import { Column, Node, Constraint } from './interfaces'

function printRow (p: Node) {
  let data = []

  let k: number
  let q = p
  do {
    data.push(q.col.name)
    q = q.right
  } while (q !== p)

  for (q = p.col.head.down, k = 1; q !== p; k++) {
    if (q === p.col.head) {
      data.push('\n')
    } else {
      q = q.down
    }
  }

  console.log(data.join(''))
}

function printState (choice, level: number) {
  for (let l = 0; l < level; l++) {
    printRow(choice[l])
  }
}

export enum Verbosity {
  SILENT,
  SOLUTIONS,
  PARTIAL
}

const primaryColumnNames = [
  'A', 'B', 'C'
]

const secondaryColumnNames = [
  'x'
]

const rows = [
  [0],
  [1, 3],
  [2],
  [0, 2, 3]
]

export function search<T> (primaryColumnNames, secondaryColumnNames, rows: number[][]) {
  const verbosity = Verbosity.PARTIAL
  // number of solutions found
  let count = 0
  // how many times we deleted a list element
  let updates = 0
  // How often we log results
  let spacing = 1

  // TODO: Remove cast if possible or adapt interface
  const root: Column = {
    name: 'ROOT'
  } as Column

  const colArray = [root]
  const nodeArray = []

  function readColumnNames () {
    // Skip root node
    let curColIndex = 1

    for (const primaryColumnName of primaryColumnNames) {
      const head: Node = {}
      head.up = head
      head.down = head

      const column: Column = {
        name: primaryColumnName,
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

    for (const name of secondaryColumnNames) {
      const head: Node = {}
      head.up = head
      head.down = head

      const column: Column = {
        name,
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
    let rowStart: Node = undefined

    for (const row of rows) {
      for (const columnIndex of row) {
        let node: Node = {}

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

    }

    rowStart.left = nodeArray[curNodeIndex - 1]
    nodeArray[curNodeIndex - 1].right = rowStart
  }

  readColumnNames()
  readRows()

  console.log(colArray)
  console.log(nodeArray)
}

search(primaryColumnNames, secondaryColumnNames, rows)
