import { type ICardNumber } from "./App.tsx";

interface IMatch {
  firstNumber: number;
  secondNumber: number;
  cards: React.JSX.Element[];
  setCards: (cards: React.JSX.Element[]) => void;
  cardNumbers: ICardNumber[];
  setCardNumbers: (cardNumbers: ICardNumber[]) => void;
  setIsGameComplete: (isGameComplete: boolean) => void;
}

export default function checkIfMatch({ props }: { props: IMatch }) {
  if (props.firstNumber === props.secondNumber) {
    console.log("they match " + props.firstNumber + " " + props.secondNumber);

    const newCardNumbers = props.cardNumbers.filter(
      (number) => number.number !== props.firstNumber,
    );
    setTimeout(() => {
      props.setCardNumbers(newCardNumbers);
      if (newCardNumbers.length === 0) {
        props.setIsGameComplete(true);
      }
    }, 3000);
  } else {
    console.log(
      "they don't match " + props.firstNumber + " " + props.secondNumber,
    );
    const updatedCardNumbers = props.cardNumbers.map((number: ICardNumber) => {
      return { ...number, isShowing: false };
    });
    setTimeout(() => {
      props.setCardNumbers(updatedCardNumbers);
    }, 3000);
  }
}
