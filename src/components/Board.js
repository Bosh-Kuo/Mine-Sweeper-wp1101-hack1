/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import createBoard from '../util/createBoard';
import { revealed } from '../util/reveal';
import './css/Board.css'


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        {/* -- TODO 3-1 -- */ }
        {/* Useful Hint: createBoard(...) */ }
        var newBoardObj = createBoard(boardSize, mineNum)
        setBoard(newBoardObj.board)
        setMineLocations(newBoardObj.mineLocations)
    }

    const restartGame = () => {
        {/* -- TODO 5-2 -- */ }
        {/* Useful Hint: freshBoard() */ }
        freshBoard()
        setWin(false)
        setGameOver(false)
        setNonMineCount(0)
        setRemainFlagNum(0)
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        {/* -- TODO 3-2 -- */ }
        {/* Useful Hint: A cell is going to be flagged. 'x' and 'y' are the xy-coordinate of the cell. */ }
        {/* Reminder: If the cell is already flagged, you should unflagged it. Also remember to update the board and the remainFlagNum. */ }
        {/* Reminder: The cell can be flagged only when it is not revealed. */ }
        if (!board[x][y].revealed) {
            let newBoard = [...board]
            newBoard[x][y].flagged = !newBoard[x][y].flagged
            setBoard(newBoard)

            if (newBoard[x][y].flagged) {
                setRemainFlagNum(remainFlagNum + 1)
            } else {
                setRemainFlagNum(remainFlagNum - 1)
            }
        }
    };

    const revealCell = (x, y) => {
        {/* -- TODO 4-1 -- */ }
        {/* Reveal the cell */ }
        {/* Useful Hint: The function in reveal.js may be useful. You should consider if the cell you want to reveal is a location of mines or not. */ }
        {/* Reminder: Also remember to handle the condition that after you reveal this cell then you win the game. */ }
        if (board[x][y].revealed === false && board[x][y].flagged === false && gameOver === false && win === false) {
            if (board[x][y].value === '💣') {
                //  show all the mines that havenot been flagged and you lost the game.
                for (let location of mineLocations) {
                    let newboard = [...board]
                    let afterReveal = revealed(newboard, location[0], location[1], nonMineCount)
                    setBoard(afterReveal.board)
                    setNonMineCount(afterReveal.newNonMinesCount)
                }
                setGameOver(true)
            }

            let newboard = [...board]
            let afterReveal = revealed(newboard, x, y, nonMineCount)
            // console.log(afterReveal.newNonMinesCount)
            setBoard(afterReveal.board)
            setNonMineCount(afterReveal.newNonMinesCount)
            if (nonMineCount === boardSize*boardSize-mineNum-1) {
                setWin(true)
            }
        }
    };

    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                {/* <h1>This is the board Page!</h1>  This line of code is just for testing. Please delete it if you finish this function. */}

                {/* -- TODO 3-1 -- */}
                {/* Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.  */}
                {/* Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}

                <div className="boardContainer">
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver} win={win} />
                    {board.map((rowArray) => {
                        return (
                            <div id={"row" + rowArray[0].x} style={{ display: "flex" }}>
                                {rowArray.map((item) => {
                                    return <Cell rowIdx={item.x} colIdx={item.y} detail={item} updateFlag={updateFlag} revealCell={revealCell} ></Cell>
                                })}
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            {(win===true || gameOver===true) ? <Modal restartGame={restartGame} backToHome={backToHome} win={win}/> : ''}
        </div>
        
    );



}

export default Board