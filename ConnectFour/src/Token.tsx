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

  function toggleDropTokenButtonDisplay() {
    if (isFirstRow) {
      if (winner == null) {
        return <DropTokenButton />;
      }
    }
  }

  function toggleTokenStyle() {
    if (box === null) {
      return "emptyBox";
    }

    if (box === 1) {
      return "red";
    } else if (box === 2) {
      return "yellow";
    }
  }

  return (
    <div>
      {toggleDropTokenButtonDisplay()}
      <div className={toggleTokenStyle()}>
        {box === 1 || box === 2 ? <div className="token"></div> : ""}
      </div>
    </div>
  );
}
