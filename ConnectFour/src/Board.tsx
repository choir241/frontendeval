import Token from "./Token";

export default function Board({
  board,
  winner,
  updateTurn,
  turn,
  updateBoard
}: {
  board: null[][] | number[][];
  winner: string | number | null;
  updateTurn: (turn: string) => void;
  turn: string;
  updateBoard: (board: null[][] | number[][]) => void
}) {

  const deepClone = window.connectFour.deepClone(board);

  //each row of the array is a column, not a row
  return board.map((col: number[] | null[], colI: number) => {
    const column = deepClone[colI];
    return (
      <section className="column" key={colI}>
        {col.map((box: number | null, rowI: number) => {
          return (
            <Token
              updateBoard={updateBoard}
              turn={turn}
              updateTurn={updateTurn}
              column={column}
              isFirstRow={rowI === col.length - 1}
              box={box}
              winner={winner}
              deepClone={deepClone}
            />
          );
        })}
      </section>
    );
  });
}
