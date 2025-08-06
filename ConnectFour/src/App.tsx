// The board should be 7 wide by 6 high

// It should alternate between the 'red' and 'yellow' players turn

// Clicking the "Drop" button should drop a token of the current player's to the bottom-most free position

// Clicking the "Drop" button on a full column should have no effect

// If either player gets four in a row (horizontally, vertically, or diagonally):
// The "COLOR's turn" heading should be replaced by "COLOR won!"
// The "Drop" buttons should be replaced by a "Play again" button
// If the board is full and there is no winner:
// The "COLOR's turn" heading should be replaced by "Draw!"
// The "Drop" buttons should be replaced by a "Play again" button
// Important
// Checking the win condition is and outside the scope of this question (unless you want the extra challenge!). We have provided a utility to check whether there is a winner or draw. If you are forking a Frontend Eval codepen template, you can access it via window.connectFour.checkForWinner, or you can download it here. Example usage:

// Board must be a 2D array filled with `null` for empty space
// and primitive values representing player tokens (numbers, strings)
// e.g. 1 or 2, 'red' or 'yellow', 'player 1' or 'player 2'
//
// returns `null` for no winner, 'draw' for draw, or the value of the winning token

// const exampleBoard = [
//   [1,2,null,null,null,null],
//   [1,1,1,1,null,null], // player `1` has 4 in a row
//   [2,null,null,null,null,null],
//   [2,null,null,null,null,null],
//   [2,null,null,null,null,null],
//   [null,null,null,null,null,null],
//   [null,null,null,null,null,null]
// ];

// const winner = window.connectFour.checkForWinner(exampleBoard);

// If you're using React, we have provided a separate utility to make a deep copy of an array/object. You may find this useful if you store the board in React state. Example usage:
// const clonedBoard = window.connectFour.deepClone(board);

//1. render the UI board with the drop buttons
//2. alternate between player one and two (red and yellow)
//3. click drop button should drop token to bottom most free position
//4. clicking drop button on full column does nothing

// is the column full?
// how do we check if column is full
// if everything in column is a value

// if column is not full, we go to last
// row

//and add a value according to turn value
//

import { useState, useEffect } from "react";
import { determineWinner } from "./determineWinner";
import Board from "./Board";
import RenderDropTokenButtons from "./RenderDropTokenButtons";

declare global {
  interface Window {
    connectFour: any;
  }
}

window.connectFour = {
  deepClone: (arr: null[] | number[]) => JSON.parse(JSON.stringify(arr)),
  checkForWinner: (board: null[][] | number[][]) => {
    const NUM_IN_ROW_WIN = 4;
    const checkVerticalWinner = (board: number[][] | null[][]) => {
      for (let x = 0; x < board.length; x++) {
        let maxNumInRow = 1;
        let lastToken = board[x][0];
        for (let y = 1; y < board[x].length; y++) {
          const currentToken = board[x][y];
          if (currentToken === lastToken && currentToken !== null) {
            maxNumInRow++;
            if (maxNumInRow === NUM_IN_ROW_WIN) {
              return currentToken;
            }
          } else {
            maxNumInRow = 1;
          }
          lastToken = currentToken;
        }
      }

      return null;
    };

    const checkHorizontalWinner = (board: number[][] | null[][]) => {
      for (let y = 0; y < board[0].length; y++) {
        let maxNumInRow = 1;
        let lastToken = board[0][y];
        for (let x = 1; x < board.length; x++) {
          const currentToken = board[x][y];
          if (currentToken === lastToken && currentToken !== null) {
            maxNumInRow++;
            if (maxNumInRow === NUM_IN_ROW_WIN) {
              return currentToken;
            }
          } else {
            maxNumInRow = 1;
          }
          lastToken = currentToken;
        }
      }

      return null;
    };

    const checkDiagonalWinner = (board: number[][] | null[][]) => {
      for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
          const currentToken = board[x][y];

          if (
            currentToken !== null &&
            ((x < board.length - 3 &&
              y < board[x].length - 3 &&
              currentToken === board[x + 1][y + 1] &&
              currentToken === board[x + 2][y + 2] &&
              currentToken === board[x + 3][y + 3]) ||
              (x >= 3 &&
                currentToken === board[x - 1][y + 1] &&
                currentToken === board[x - 2][y + 2] &&
                currentToken === board[x - 3][y + 3]))
          ) {
            return currentToken;
          }
        }
      }

      return null;
    };

    let hasEmptySpace = false;
    board.forEach(
      (row: any) =>
        (hasEmptySpace =
          hasEmptySpace || row.findIndex((cell: null) => cell === null) >= 0),
    );
    if (!hasEmptySpace) {
      return "draw";
    }
    return (
      checkVerticalWinner(board) ||
      checkHorizontalWinner(board) ||
      checkDiagonalWinner(board)
    );
  },
};

export default function App() {
  const boardExample = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  const clonedBoard = window.connectFour.deepClone(boardExample);

  const [board, setBoard] = useState(clonedBoard);
  const [turn, setTurn] = useState("red");
  const [winner, setWinner] = useState<null | number | string>(null);

  useEffect(() => {
    const checkForWinner = window.connectFour.checkForWinner(board);

    if (checkForWinner) {
      setWinner(checkForWinner);
    }
  }, [board]);

  function updateBoard(board: null[][] | number[][]) {
    setBoard(board);
  }

  function updateTurn(turn: string) {
    setTurn(turn);
  }

  return (
    <section className="game">
      <span>{determineWinner({ winner })}</span>

      <span>{!winner ? `${turn + "'s turn"}` : ""} </span>
      {winner !== null ? (
        <button
          className="playAgain"
          onClick={() => {
            setBoard(clonedBoard);
            setWinner(null);
          }}
        >
          Play Again
        </button>
      ) : (
        ""
      )}
      <section className="board">
        <RenderDropTokenButtons
          turn={turn}
          updateBoard={updateBoard}
          updateTurn={updateTurn}
          board={board}
          winner={winner}
        />
        <Board board={board} />
      </section>
    </section>
  );
}
