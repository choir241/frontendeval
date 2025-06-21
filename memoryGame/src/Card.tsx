// GameCard should re-render, but should not cause App to re-render.

import { type ICard } from "./App";

export default function GameCard({
  card,
  onClickEventHandler,
}: {
  card: ICard;
  onClickEventHandler: (e: ICard) => void;
}) {
  return (
    <div
      className={`card ${card.isMatched ? "matched" : ""}`}
      onClick={() => {
        card.isFlipped = true;
        onClickEventHandler(card);
      }}
    >
      {card.isFlipped ? card.number : ""}
    </div>
  );
}
