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
// console.log(winner); // 1

// If you're using React, we have provided a separate utility to make a deep copy of an array/object. You may find this useful if you store the board in React state. Example usage:
// const clonedBoard = window.connectFour.deepClone(board);

import { useState } from "react";

//1. render the UI board with the drop buttons
//2. alternate between player one and two (red and yellow)
//3. click drop button should drop token to bottom most free position
//4. clicking drop button on full column does nothing

window.connectFour = {
  deepClone: (arr) => JSON.parse(JSON.stringify(arr)),
  checkForWinner: (board) => {
    const checkVerticalWinner = (board) => {
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

    const checkHorizontalWinner = (board) => {
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

    const checkDiagonalWinner = (board) => {
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
      (row) =>
        (hasEmptySpace =
          hasEmptySpace || row.findIndex((cell) => cell === null) >= 0)
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

// const boardExample = [
//   [1,2,null,null,null,null],
//   [1,1,1,1,null,null], // player `1` has 4 in a row
//   [2,null,null,null,null,null],
//   [2,null,null,null,null,null],
//   [2,null,null,null,null,null],
//   [2,null,null,null,null,null],
//   [1,null,null,null,null,null]
// ];

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

  function dropToken(colId) {
    const column = [];
    board.forEach((row) => {
      row.forEach((rowElement, i) => {
        if (colId === i) {
          column.push(rowElement);
        }
      });
    });
    const checkForFullColumn = column.every((colElement)=>colElement);

    if(checkForFullColumn){
      console.log('column is full');
      return;
    }

    console.log('column is not full')
    let rowId = 6;
    for(let i = column.length-1; i >=0; i--){
      if(!column[i]){
        rowId = i;
        break;
      }
    }
    const addToken = board.map((col, index)=>{
      let row = [];
      for(let i = 0; i < col.length; i++){
        if(index === rowId && i === colId && (turn === 1 || turn === 2)){
          row.push(turn);
        }else{
          row.push(col[i])
        }
      }
      return row
    })

    setBoard(addToken);
  }

  function renderBoard() {
    return board.map((col, i) => {
      return (
        <section className="row" key={i}>
          {col.map((box, index) => {
            if (i === 0 && box === null) {
              return (
                <div key={`empty-${index}`} className="dropButton">
                  <button onClick={() => dropToken(index)}>Drop</button>
                  <div className="emptyBox"></div>
                </div>
              );
            } else if (i === 0 && box === 1) {
              return (
                <div key={`red-${index}`} className="dropButton">
                  <button onClick={() => dropToken(index)}>Drop</button>
                  <div className="red"></div>
                </div>
              );
            } else if (i === 0 && box === 2) {
              return (
                <div key={`yellow-${index}`} className="dropButton">
                  <button onClick={() => dropToken(index)}>Drop</button>
                  <div key={`yellow-${index}`} className="yellow"></div>
                </div>
              );
            } else if (box === null) {
              return <div key={`empty-${index}`} className="emptyBox"></div>;
            } else if (box === 1) {
              return <div key={`red-${index}`} className="red"></div>;
            } else if (box === 2) {
              return <div key={`yellow-${index}`} className="yellow"></div>;
            }
          })}
        </section>
      );
    });
  }

  const [board, setBoard] = useState(clonedBoard);
  const [turn, setTurn] = useState(1);

  return <>{renderBoard()}</>;
}
