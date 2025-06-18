import GameCard from "./Card.tsx";
import { useRef, useEffect } from "react";
import type { ICardNumber } from "./App.tsx";

interface IRenderedCards {
  cards: React.JSX.Element[];
  setCards: (cards: React.JSX.Element[]) => void;
  cardNumbers: ICardNumber[];
  setCardNumbers: (cardNumbers: ICardNumber[]) => void;
  setIsGameComplete: (isGameComplete: boolean) => void;
  isGameComplete: boolean;
}

export default function RenderedCards({ props }: { props: IRenderedCards }) {
  let firstNumber = useRef(0);
  const firstFlip = useRef(false);
  const secondFlip = useRef(false);

  const tempCardNumbers: ICardNumber[] = [];

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      tempCardNumbers.push({ number: i, isShowing: false, id: i });
    } else {
      tempCardNumbers.push({ number: i - 1, isShowing: false, id: i });
    }
  }
  tempCardNumbers.sort(() => Math.random() - 0.5);

  useEffect(() => {
    props.setCardNumbers(tempCardNumbers);
  }, [props.isGameComplete]);

  const tempCards = props.cardNumbers.map((cardNumber) => {
    return (
      <GameCard
        key={cardNumber.id}
        props={{
          number: cardNumber.number,
          firstNumber,
          firstFlip,
          secondFlip,
          setCards: props.setCards,
          cards: props.cards,
          cardNumbers: props.cardNumbers,
          setCardNumbers: props.setCardNumbers,
          isShowing: cardNumber.isShowing,
          id: cardNumber.id,
          setIsGameComplete: props.setIsGameComplete,
        }}
      />
    );
  });

  useEffect(() => {
    props.setCards(tempCards);
    if (props.isGameComplete) {
      props.setCardNumbers([]);
    }
  }, [props.isGameComplete]);

  return tempCards;
}
