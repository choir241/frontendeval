import { useState } from "react";
import { checkIfMatch } from "./checkIfMatch.ts";

export default function MemoryCard({
  initialReveal,
  setInitialReveal,
  firstNum,
  setFirstNum,
  num,
  cards,
  setCards,
  flipCounter,
  setFlipCounter,
}: {
  initialReveal: boolean;
  setInitialReveal: (initialReveal: boolean) => void;
  firstNum: number;
  setFirstNum: (firstNum: number) => void;
  num: number;
  cards: number[];
  setCards: (cards: number[]) => void;
  flipCounter: number;
  setFlipCounter: (flipCounter: number) => void;
}) {
  const [revealed, setRevealed] = useState(false);

  function renderCard() {
    let tempFlipCounter = flipCounter;
    console.log(tempFlipCounter);

    if (tempFlipCounter === 0 || tempFlipCounter === 1) {
      return (
        <div
          className="card"
          onClick={() => {
            tempFlipCounter++;
            setRevealed(!revealed);
            setFlipCounter(tempFlipCounter);
            setFirstNum(num);
          }}
        >
          {revealed ? num : ""}
        </div>
      );
    } else if (tempFlipCounter === 2) {
      return (
        <div
          className="card"
          onClick={() => {
            setRevealed(!revealed);
            setFlipCounter(tempFlipCounter);
            tempFlipCounter = 0;
            setInitialReveal(true);
            checkIfMatch({
              setFirstNum,
              setInitialReveal,
              setFlipCounter,
              firstNum,
              secondNum: num,
              setRevealed,
              cards,
              setCards,
            });
          }}
        >
          {revealed && initialReveal ? num : ""}
        </div>
      );
    }
  }

  return renderCard();
}
