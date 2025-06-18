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

// 1. 36 cards that are laid out in a 6 x 6 grid
// 2. 2 of each randomly placed numbers from 1-18 on the grid
// 3. Cards should be face down, no number being shown
// 4. Clicking a card should 'reveal' it - showing the hidden number of the card
// 5. Clicking a second card should reveal that card
// 5.5. If the second card has the same number as the first card,
// 6. both cards should be removed from the board after 3 seconds
// 6.5. If the second card has a different number to the first card,
// 7. both cards should be 'hidden' again after 3 seconds (i.e. turned face down)
// 8. The user shouldn't be able to turn over any more cards
// 8.5. until the 3 second timer completes and the two revealed cards are either removed (if they matched), or hidden again (if they didn't)
// 8.5. Once all cards are removed from the board,
// 9. the game is over and the 'Play again' button should be shown
// 9.5. Clicking 'Play again'
// 10. should generate a new, random set of cards on the grid

// Bonuses
// 13 show play button intially to start the game

// 11 prevent double clicking
// 12 keep grids in place after removing the ones you matched
// 14 keep track of the cards you have matched vs the ones leftover

import RenderedCards from "./RenderCards.tsx";
import { useState } from "react";
export interface ICardNumber {
  number: number;
  isShowing: boolean;
  id: number;
}

export default function App() {
  const [cards, setCards] = useState<React.JSX.Element[]>([]);
  const [cardNumbers, setCardNumbers] = useState<ICardNumber[]>([]);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [gameStart, setGameStart] = useState("hidden");

  return (
    <>
      {gameStart === "hidden" ? (
        <button onClick={() => setGameStart("")}>Start Game</button>
      ) : (
        ""
      )}

      <section className={`${gameStart} cardContainer`}>
        {RenderedCards({
          props: {
            cards,
            setCards,
            cardNumbers,
            setCardNumbers,
            setIsGameComplete,
            isGameComplete,
          },
        })}
        {isGameComplete ? (
          <button onClick={() => setIsGameComplete(false)}>Play Again</button>
        ) : (
          ""
        )}
      </section>
    </>
  );
}
