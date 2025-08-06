import Token from "./Token";

export default function Board({ board }: { board: null[][] | number[][] }) {
  //each row of the array is a column, not a row
  return (
    <div className="boardContainer">
      {board.map((col: number[] | null[], colI: number) => {

        return (
          <section className="column" key={colI}>
            {col.map((box: number | null) => {
              return <Token box={box} />;
            })}
          </section>
        );
      })}
    </div>
  );
}
