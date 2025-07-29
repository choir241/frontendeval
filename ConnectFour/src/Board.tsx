import Token from "./Token";
import { DropTokenButtonProvider } from "./Context";

export default function Board({ board }: { board: null[][] | number[][] }) {
  //each row of the array is a column, not a row
  return board.map((col: number[] | null[], colI: number) => {
    const deepClone = window.connectFour.deepClone(board);
    const column = deepClone[colI];

    return (
      <section className="column" key={colI}>
        {col.map((box: number | null, rowI: number) => {
          const checkIsFirstRow = rowI === col.length - 1;
          return (
            <DropTokenButtonProvider.Provider
              key={rowI}
              value={{ deepClone, column }}
            >
              <Token isFirstRow={checkIsFirstRow} box={box} />
            </DropTokenButtonProvider.Provider>
          );
        })}
      </section>
    );
  });
}
