import checkIfMatch from "./checkIfMatch.ts";
import { type ICardNumber } from "./App.tsx";

interface ICard {
  number: number;
  firstNumber: React.RefObject<number>;
  firstFlip: React.RefObject<boolean>;
  setCards: (cards: React.JSX.Element[]) => void;
  cards: React.JSX.Element[];
  cardNumbers: ICardNumber[];
  setCardNumbers: (cardNumbers: ICardNumber[]) => void;
  isShowing: boolean;
  id: number;
  secondFlip: React.RefObject<boolean>;
  setIsGameComplete: (isGameComplete: boolean) => void;
}

export default function GameCard({ props }: { props: ICard }) {
  if (
    (!props.firstFlip.current && !props.secondFlip.current) ||
    (props.firstFlip.current && !props.secondFlip.current)
  ) {
    return (
      <section
        className="card"
        onClick={() => {
          if (!props.firstFlip.current && !props.secondFlip.current) {
            props.setCardNumbers(
              props.cardNumbers.map((cardNumber) => {
                if (cardNumber.id === props.id) {
                  return { ...cardNumber, isShowing: !cardNumber.isShowing };
                } else {
                  return cardNumber;
                }
              }),
            );
            console.log("first flip");
            props.firstNumber.current = props.number;
            props.firstFlip.current = true;
          } else if (
            props.firstFlip.current &&
            !props.secondFlip.current &&
            !props.cardNumbers.find((cardNumber) => cardNumber.id === props.id)
              ?.isShowing
          ) {
            console.log("second flip");
            props.setCardNumbers(
              props.cardNumbers.map((cardNumber) => {
                if (cardNumber.id === props.id) {
                  return { ...cardNumber, isShowing: !cardNumber.isShowing };
                } else {
                  return cardNumber;
                }
              }),
            );
            checkIfMatch({
              props: {
                firstNumber: props.firstNumber.current,
                secondNumber: props.number,
                cards: props.cards,
                setCards: props.setCards,
                cardNumbers: props.cardNumbers,
                setCardNumbers: props.setCardNumbers,
                setIsGameComplete: props.setIsGameComplete,
              },
            });
            props.secondFlip.current = true;
            setTimeout(() => {
              props.firstFlip.current = false;
              props.secondFlip.current = false;
            }, 3000);
          }
        }}
      >
        {props.isShowing ? props.number : ""}
      </section>
    );
  } else {
    return (
      <section className="card">{props.isShowing ? props.number : ""}</section>
    );
  }
}
