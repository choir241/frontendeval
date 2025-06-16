export function checkIfMatch({setFirstNum, setInitialReveal, setFlipCounter, firstNum, secondNum, setRevealed, cards, setCards }: {setFirstNum: (firstNum: number) => void, setInitialReveal: (initialReveal: boolean) => void, setFlipCounter: (flipCounter: number) => void, firstNum: number, secondNum: number, setRevealed: (revealed: boolean) => void, cards: number[], setCards: (cards: number[]) => void}){
    if(firstNum === secondNum){
        setTimeout(() => {
            cards.splice(cards.indexOf(firstNum), 1);
            cards.splice(cards.indexOf(secondNum), 1);
            setCards([...cards]);
            setFirstNum(0);
        }, 3000);
    }else{
        setTimeout(() => {
            setRevealed(false);
            setInitialReveal(false);
            setFlipCounter(0);
            setFirstNum(0);
        }, 3000);
    }
}
