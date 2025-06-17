import GameCard from "./Card.tsx";
import { useRef, useEffect } from "react";

interface IRenderedCards{
  cards: React.JSX.Element[];
  setCards: (cards: React.JSX.Element[]) => void;
}

export default function RenderedCards({props}: {props: IRenderedCards}){
    let firstCard = useRef(0);
    const firstFlip = useRef(false);

    const tempCards: React.JSX.Element[] = [];

    for(let i = 0; i < 36; i++  ){
      if(i < 18){
        tempCards.push(<GameCard key = {i+1} props={{number: i+1, firstNumber: firstCard, firstFlip: firstFlip, setCards: props.setCards, cards: props.cards}} />)
      }else{  
        tempCards.push(<GameCard key = {i-17} props={{number: i-17, firstNumber: firstCard, firstFlip: firstFlip, setCards: props.setCards, cards: props.cards}} />)
      }
    }

    useEffect(()=>{
      props.setCards(tempCards);
    },[]);

    return tempCards.sort(() => Math.random() - 0.5);
}