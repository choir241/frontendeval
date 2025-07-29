import { useContext } from "react";
import { GameProvider } from "./Context";
import { DropTokenButtonProvider } from "./Context";

export default function DropTokenButton() {
  const { turn, updateTurn, updateBoard } = useContext(GameProvider);
  const { column, deepClone } = useContext(DropTokenButtonProvider);

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
