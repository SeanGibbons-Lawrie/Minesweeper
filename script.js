//Display
import {
  createBoard,
  markTile,
  TILE_STATUSES,
  revealTile,
  checkWin,
  checkLose,
} from './minesweeper.js'

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 16

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')
const messageText = document.querySelector('.subtext')

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element)
    tile.element.addEventListener('click', () => {
      revealTile(board, tile)
      checkGameEnd()
    })
    tile.element.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      markTile(tile)
      listMinesLeft()
    })
  })
})
boardElement.style.setProperty('--size', BOARD_SIZE)

minesLeftText.textContent = NUMBER_OF_MINES

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    )
  }, 0)

  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
}

function checkGameEnd() {
  const win = checkWin(board)
  const lose = checkLose(board)

  if (win || lose) {
    boardElement.addEventListener('click', stopProp, { capture: true })
    boardElement.addEventListener('contextmenu', stopProp, { capture: true })
  }

  if (win) {
    messageText.textContent = 'You won!'
  }

  if (lose) {
    messageText.textContent = 'You lost!'
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.TILE_STATUSES === TILE_STATUSES.MARKED) markTile(tile)
        if (tile.mine) revealTile(board, tile)
      })
    })
  }
}

function stopProp(e) {
  e.stopImmediatePropagation()
}

//1. Populate a board with tiles/mines tick
//2. Left click on tiles tick
//a. Reveal Tiles
//3. Right click on tiles tick
//a. Mark tiles tick
//4. Check for win/lose
