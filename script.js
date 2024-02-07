//Display
import { createBoard, markTile, TILE_STATUSES } from './minesweeper.js'

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 6

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')

console.log(board)

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element)
    tile.element.addEventListener('click', () => {})
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

//1. Populate a board with tiles/mines tick
//2. Left click on tiles tick
//a. Reveal Tiles
//3. Right click on tiles tick
//a. Mark tiles
//4. Check for win/lose
