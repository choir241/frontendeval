import { useState, useRef} from "react";
import checkIfMatch from "./checkIfMatch.ts";

interface ICard{
    number: number;
    firstNumber: React.RefObject<number>;
    firstFlip: React.RefObject<boolean>;
    setCards: (cards: React.JSX.Element[]) => void;
    cards: React.JSX.Element[];
}

export default function GameCard({props}: {props: ICard}){

    const [isShowing, setIsShowing] = useState(false);
    const cardRef = useRef(null);

    // function checkIfMatch(firstNumber: number, secondNumber: number){
    //     console.log(props.cards[0]);

    //     if(firstNumber === secondNumber){
    //         console.log('they match ' + firstNumber + " " + secondNumber)
    //         // const newCards = props.cards.filter((card, index) => index !== firstNumber && index !== secondNumber);
    //         console.log(newCards);
    //         // props.setCards(newCards);
    //         // return true;
    //     }else{
    //         console.log('they don\'t match ' + firstNumber + " " + secondNumber)
    //         return false;
    //     }
    // }

    return (
        <section key = {props.number} ref = {cardRef} className="card" onClick={() => {
                setIsShowing(!isShowing)
                if(!props.firstFlip.current){
                    console.log('first flip')
                    props.firstNumber.current = props.number;
                    console.log(props.firstNumber)
                    props.firstFlip.current = true;
                }else{
                    console.log('second flip')
                    checkIfMatch(props.firstNumber.current, props.number, props.cards, props.setCards, cardRef);
                    props.firstFlip.current = false;
                }
                }}>
            {/* {isShowing ? props.number : ""} */}
            {props.number}
        </section>
    )
}