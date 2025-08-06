export default function DropTokenButton({
  column,
  turn,
  updateTurn,
  updateBoard,
  deepClone,
}: {
  column: any[];
  turn: string;
  updateTurn: (e: string) => void;
  updateBoard: (e: null[][] | number[][]) => void;
  deepClone: null[][] | number[][];
}) {
  function dropToken() {
    const isColumnFull = column.every(
      (colElement: number | null) => colElement !== null,
    );
    if (isColumnFull) {
      return;
    }

    for (let i = 0; i < column.length; i++) {
      if (column[i] == null && turn == "red") {
        column[i] = 1;
        updateTurn("yellow");
        break;
      } else if (column[i] == null && turn == "yellow") {
        column[i] = 2;
        updateTurn("red");
        break;
      }
    }

    updateBoard(deepClone);
  }

  return <button onClick={() => dropToken()}>Drop</button>;
}
