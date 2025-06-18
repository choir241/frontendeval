import { type ICardNumber } from "./App.tsx";

interface IMatch {
  firstNumber: number;
  secondNumber: number;
  cards: React.JSX.Element[];
  setCards: (cards: React.JSX.Element[]) => void;
  cardNumbers: ICardNumber[];
  setCardNumbers: (cardNumbers: ICardNumber[]) => void;
  setIsGameComplete: (isGameComplete: boolean) => void;
  numOfMatches: number;
  setNumOfMatches: (numOfMatches: number) => void;
}

export default function checkIfMatch({ props }: { props: IMatch }) {
  if (props.firstNumber === props.secondNumber) {
    console.log("they match " + props.firstNumber + " " + props.secondNumber);

    const newCardNumbers = props.cardNumbers.map((number) => {
      if (number.number === props.firstNumber) {
        return { ...number, isMatched: true, isShowing: false };
      } else {
        return number;
      }
    });

    props.setNumOfMatches(props.numOfMatches + 1);
    setTimeout(() => {
      props.setCardNumbers(newCardNumbers);

      if (newCardNumbers.filter((number) => !number.isMatched).length === 0) {
        props.setIsGameComplete(true);
      }
    }, 3000);
  } else {
    console.log(
      "they don't match " + props.firstNumber + " " + props.secondNumber,
    );
    const updatedCardNumbers = props.cardNumbers.map((number: ICardNumber) => {
      if (
        number.number === props.firstNumber ||
        number.number === props.secondNumber
      ) {
        return { ...number, isShowing: false };
      } else {
        return number;
      }
    });
    setTimeout(() => {
      props.setCardNumbers(updatedCardNumbers);
    }, 3000);
  }
}
