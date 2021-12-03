/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
  {/* -- TODO 4-2 -- */ }
  {/* Useful Hint: If the cell is already revealed, do nothing. */ }
  {/* Useful Hint: If the value of the cell is not 0, only show the cell value. */ }
  let checkPointList = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    [x, y + 1],
    [x - 1, y + 1],
    [x - 1, y]
  ]
  let boardSize = board.length;
  if (board[x][y].revealed === false) {
    board[x][y].revealed = true
    newNonMinesCount += 1
    if (board[x][y].value === 0) {
      for (let checkPoint of checkPointList) {
        if (checkPoint[0] >= boardSize || checkPoint[0] < 0 || checkPoint[1] >= boardSize || checkPoint[1] < 0) {
          continue;
        } else {
          let newBoard = board
          let afterReveal = revealed(newBoard, checkPoint[0], checkPoint[1], newNonMinesCount)
          board = afterReveal.board
          newNonMinesCount = afterReveal.newNonMinesCount
        }
      }
    }
  }

  {/* -- TODO 4-2 -- */ }
  {/* Useful Hint: If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0. */ }
  {/* Useful Hint: The input variables 'newNonMinesCount' and 'board' may be changed in this function. */ }



  return { board, newNonMinesCount };
};
