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

import { useState } from "react";
// import { determineWinner } from "./determineWinner";
import TokenBoxCard from "./TokenBoxCard.tsx";

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
          hasEmptySpace || row.findIndex((cell: null) => cell === null) >= 0)
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
    [0, 1, 2, 1, 1, 2],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  const clonedBoard = window.connectFour.deepClone(boardExample);

 function dropToken(colId: number) {

    const isColumnFull = board[colId].every(
      (colElement: number | null) => colElement !== null
    );
    if(isColumnFull){
      return;
    }

    for(let i = 0; i < board[colId].length; i++){
      if(board[colId][i] == null && turn == 1){
        board[colId][i] = 1
        break;
      }else if(board[colId][i] == null && turn == 2){
        board[colId][i] = 2
        break;
      }
    }

  }

  function renderBoard() {
    //each row of the array is a column, not a row
    return board.map((board: number[] | null[], colI: number) => {
      return (
        <section className="column" key={colI}>
          {board.map((box: number | null, rowI: number) => {
            if (rowI === 0 && box === null) {
              return (
                <div key={`empty-${rowI}`}>
                  {winner !== 0 ? (
                    ""
                  ) : (
                    <button key={rowI} onClick={() => dropToken(colI)}>
                      Drop
                    </button>
                  )}
                  <TokenBoxCard className="emptyBox" isToken={false} />
                </div>
              );
            } else if (rowI === 0 && box === 1) {
              return (
                <div key={`red-${rowI}`} className="dropButton">
                  {winner !== 0 ? (
                    ""
                  ) : (
                    <button onClick={() => dropToken(colI)}>Drop</button>
                  )}
                  <div className="red"></div>
                </div>
              );
            } else if (rowI === 0 && box === 2) {
              return (
                <div key={`yellow-${rowI}`} className="dropButton">
                  {winner !== 0 ? (
                    ""
                  ) : (
                    <button onClick={() => dropToken(colI)}>Drop</button>
                  )}{" "}
                  <div key={`yellow-${rowI}`} className="yellow"></div>
                </div>
              );
            } else if (turn === 1) {
              return (
                <TokenBoxCard
                  key={`red-${rowI}`}
                  className="red"
                  isToken={false}
                />
              );
            } else if (turn === 2) {
              return (
                <TokenBoxCard
                  key={`yellow-${rowI}`}
                  className="yellow"
                  isToken={false}
                />
              );
            } else if (box === null) {
              return (
                <TokenBoxCard
                  key={`empty-${rowI}`}
                  className="emptyBox"
                  isToken={false}
                />
              );
            }
          })}
        </section>
      );
    });
  }
  const [board, setBoard] = useState(clonedBoard);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState<null | number>(0);

  return (
    <>
      {/* {winner !== 0 ? (
        <button
          onClick={() => {
            setBoard(boardExample);
            setWinner(0);
          }}
        >
          Play again
        </button>
      ) : (
        ""
      )}
      {determineWinner({ turn, winner })} */}

      <section className="board">{renderBoard()}</section>
    </>
  );
}
