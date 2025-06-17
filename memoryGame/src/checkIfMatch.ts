export default function checkIfMatch(firstNumber: number, secondNumber: number, cards: React.JSX.Element[], setCards: (cards: React.JSX.Element[]) => void, cardRef: any){
    const newCards = cards.filter((card, index) => console.log(card));
    console.log(newCards);
    if(firstNumber === secondNumber){
        console.log('they match ' + firstNumber + " " + secondNumber)
        console.log(cardRef.current)
        const newCards = cards.filter((card, index) => console.log(card));
        console.log(newCards);
        // setCards(newCards);
        // return true;
    }else{
        console.log('they don\'t match ' + firstNumber + " " + secondNumber)
        return false;
    }
}