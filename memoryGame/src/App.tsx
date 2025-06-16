// Create a card matching game to test the player's memory.

// This mockup shows a game in progress: the player has matched four cards, and just revealed two non-matching cards.

// This mockup shows a completed game, where the player can click the button to start again.

// Cards should be laid out on a 6x6 grid, all face down initially (i.e. numbers not showing)
// There should be a total of 36 cards with the numbers 1-18 (two of each), placed randomly on the grid
// Clicking a card should 'reveal' it - showing the hidden number of the card
// Clicking a second card should reveal that card
// If the second card has the same number as the first card, both cards should be removed from the board after 3 seconds
// If the second card has a different number to the first card, both cards should be 'hidden' again after 3 seconds (i.e. turned face down)
// The user shouldn't be able to turn over any more cards until the 3 second timer completes and the two revealed cards are either removed (if they matched), or hidden again (if they didn't)
// Once all cards are removed from the board, the game is over and the 'Play again' button should be shown
// Clicking 'Play again' should generate a new, random set of cards on the grid

import {useState} from "react";
import {initializeCards} from "./initializeCards.ts";
import MemoryCard from "./MemoryCard.tsx";

export default function App() {


    const [flipCounter, setFlipCounter] = useState(0);
    const [cards, setCards] = useState([...initializeCards( ), ...initializeCards()]);
    const [firstNum, setFirstNum] = useState(0);
    const [initialReveal, setInitialReveal] = useState(false);
    
    return (    
        <>
        <section className="cardContainer">
        {cards.map((card, index) => (
                <MemoryCard key={index} initialReveal={initialReveal} setInitialReveal={setInitialReveal} firstNum={firstNum} setFirstNum={setFirstNum} num={card} cards={cards} setCards={setCards} flipCounter={flipCounter} setFlipCounter={setFlipCounter} />
            ))}
        </section>

        
        </>

    )
}

