import { useContext } from "react";
import DropTokenButton from "./DropTokenButton";
import { GameProvider } from "./Context";

export default function Token({
  box,
  isFirstRow,
}: {
  isFirstRow: boolean;
  box: number | null;
}) {
  const { winner } = useContext(GameProvider);

  if (isFirstRow) {
    return (
      <div>
        {winner !== null ? "" : <DropTokenButton />}
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
