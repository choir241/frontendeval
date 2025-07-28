import DropTokenButton from "./DropTokenButton";

export default function Token({updateBoard, deepClone, turn, box, isFirstRow, winner, column, updateTurn}:{
  isFirstRow: boolean, box: number | null, winner: string | number | null, column: number[] | null[], updateTurn: (turn: string)=>void, turn: string, deepClone: null[][] | number[][], updateBoard: (board: number[][] | null[][])=>void }) {
  if (isFirstRow) {
    return (
      <div>
        {winner !== null ? "" : <DropTokenButton updateBoard={updateBoard} deepClone = {deepClone} turn = {turn} column={column} updateTurn={updateTurn} />}
        <div
          className={`${
            box === null ? "emptyBox" : box === 1 ? "red" : "yellow"
          }`}
        >
          {box === 1 || box === 2 ? <div className="token"></div> : ""}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`${
          box === null ? "emptyBox" : box === 1 ? "red" : "yellow"
        }`}
      >
        {box === 1 || box === 2 ? <div className="token"></div> : ""}
      </div>
    );
  }
}
