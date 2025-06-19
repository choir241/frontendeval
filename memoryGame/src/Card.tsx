// GameCard should re-render, but should not cause App to re-render.

import { type ICard } from "./App";

export default function GameCard({
  props,
  cardNumbers,
  setCardNumbers,
}: {
  props: ICard;
  cardNumbers: ICard[];
  setCardNumbers: (e: ICard[]) => void;
}) {
  function checkIfMatch({ array }: { array: ICard[] }) {
    const filterFlippedCards = array.filter((card: ICard) =>
      card.isFlipped ? card : "",
    );

    const firstNumber = filterFlippedCards[0].number;
    const secondNumber = filterFlippedCards[1].number;

    if (firstNumber === secondNumber) {
      const updateMatchedStatus = cardNumbers.map((card: ICard) => {
        if (card.number === firstNumber) {
          return { ...card, isMatched: true, isFlipped: false };
        } else {
          return card;
        }
      });
      setTimeout(() => {
        setCardNumbers(updateMatchedStatus);
      }, 3000);
    } else {
      setTimeout(() => {
        const resetFlippedStatus = cardNumbers.map((card: ICard) => {
          return { ...card, isFlipped: false };
        });

        setCardNumbers(resetFlippedStatus);
      }, 3000);
    }
  }

  let checkFlipCount = 0;

  cardNumbers.forEach((card: ICard) => {
    card.isFlipped ? checkFlipCount++ : "";
  });

  if (checkFlipCount !== 2) {
    return (
      <div
        className={`card ${props.isMatched ? "matched" : ""}`}
        onClick={() => {
          const updatedFlippedStatus = cardNumbers.map((card: ICard) => {
            if (card.id === props.id) {
              return { ...card, isFlipped: true };
            } else {
              return card;
            }
          });

          setCardNumbers(updatedFlippedStatus);

          if (checkFlipCount === 1) {
            checkIfMatch({ array: updatedFlippedStatus });
          }
        }}
      >
        {props.isFlipped ? props.number : ""}
      </div>
    );
  } else {
    return (
      <div className={`card ${props.isMatched ? "matched" : ""}`}>
        {props.isFlipped ? props.number : ""}
      </div>
    );
  }
}
