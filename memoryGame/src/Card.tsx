// GameCard should re-render, but should not cause App to re-render.

import { type ICard } from "./App";
import { useState } from "react";

export default function GameCard({
  props,
  firstCard,
  secondCard,
  setFirstCard,
  setSecondCard,
}: {
  props: ICard;
  firstCard: ICard;
  secondCard: ICard;
  setFirstCard: (e: ICard) => void;
  setSecondCard: (e: ICard) => void;
}) {
  const [currentCard, setCurrentCard] = useState(props);

  function checkIfMatch() {
    if (firstCard.number === props.number) {
      console.log("match");
      setFirstCard({ ...firstCard, isMatched: true, isFlipped: false });

      setSecondCard({ ...props, isMatched: true, isFlipped: false });
    } else {
      console.log("no match");

      setTimeout(() => {
        setFirstCard({ number: 0, id: 0, isMatched: false, isFlipped: false });

        setSecondCard({ number: 0, id: 0, isMatched: false, isFlipped: false });
      }, 3000);
    }
  }

  if (firstCard.number && secondCard.number) {
    return (
      <div className={`card ${props.isMatched ? "matched" : ""}`}>
        {props.isFlipped ? props.number : ""}
      </div>
    );
  } else {
    return (
      <div
        className={`card ${props.isMatched ? "matched" : ""}`}
        onClick={() => {
          props.isFlipped = true;
          setCurrentCard({ ...currentCard, isFlipped: true });

          if (!firstCard.number && !secondCard.number) {
            setFirstCard(props);
          } else if (firstCard.number && !secondCard.number) {
            setSecondCard(props);
            checkIfMatch();
          }
        }}
      >
        {props.isFlipped ? props.number : ""}
      </div>
    );
  }
}
