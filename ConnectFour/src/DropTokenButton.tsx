export default function DropTokenButton({updateBoard, deepClone, turn, column, updateTurn}:{updateBoard: (board: number[][] | null[][])=>void, column: any[], updateTurn: (turn: string)=>void, turn: string, deepClone: number[][] | null [][]}){
    
    function dropToken() {
    const isColumnFull = column.every(
      (colElement: number | null) => colElement !== null
    );
    if (isColumnFull) {
      return;
    }

    for (let i = 0; i < column.length; i++) {
      if (column[i] == null && turn == "red") {
        column[i] = 1;
        updateTurn("yellow")
        break;
      } else if (column[i] == null && turn == "yellow") {
        column[i] = 2;
        updateTurn("red")
        break;
      }
    }

    updateBoard(deepClone);
  }

  return(
<button onClick={() => dropToken()}>Drop</button>
  )
}