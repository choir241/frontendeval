import DropTokenButton from "./DropTokenButton";

export default function RenderDropTokenButtons({
  winner,
  board,
  turn,
  updateTurn,
  updateBoard,
}: {
  winner: null | number | string;
  board: null[][] | number[][];
  turn: string;
  updateTurn: (e: string) => void;
  updateBoard: (board: null[][] | number[][]) => void;
}) {
  return (
    <div className="buttons">
      {board.map((col: number[] | null[], colI: number) => {
        const deepClone = window.connectFour.deepClone(board);
        const column = deepClone[colI];

        return col.map((_, rowI: number) => {
          if (winner == null && rowI === 0) {
            return (
              <DropTokenButton
                updateBoard={updateBoard}
                deepClone={deepClone}
                turn={turn}
                updateTurn={updateTurn}
                column={column}
              />
            );
          }
        });
      })}
    </div>
  );
}
