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
// 12.5 remove the first number from displaying after matching
// 12.75 when you have a match and you flip over two mismatching tiles, continue showing the matching grids as green
// 14 keep track of the cards you have matched

import GameCard from "./Card";
import { useState } from "react";
export interface ICard {
  number: number;
  id: number;
  isMatched: boolean;
  isFlipped: boolean;
}

function randomizeCardNumbers({ cardNumbers }: { cardNumbers: ICard[] }) {
  let currentIndex = cardNumbers.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [cardNumbers[currentIndex], cardNumbers[randomIndex]] = [
      cardNumbers[randomIndex],
      cardNumbers[currentIndex],
    ];
  }

  return cardNumbers;
}

export function generateCardNumbers({
  max,
  min,
}: {
  max: number;
  min: number;
}) {
  const cardNumbers: ICard[] = [];

  for (let i = min; i <= max; i++) {
    if (i < Math.round(max / 2) + 1) {
      cardNumbers.push({
        number: i,
        isMatched: false,
        id: i,
        isFlipped: false,
      });
    } else {
      cardNumbers.push({
        number: i - Math.round(max / 2),
        isMatched: false,
        isFlipped: false,
        id: i,
      });
    }
  }

  return randomizeCardNumbers({ cardNumbers });
}

export default function App() {
  const [cardNumbers, setCardNumbers] = useState<ICard[]>(
    generateCardNumbers({ min: 1, max: 36 }),
  );
  const [firstCard, setFirstCard] = useState({
    number: 0,
    id: 0,
    isMatched: false,
    isFlipped: false,
  });

  function findCard(currentCard: ICard) {
    return cardNumbers.filter((card: ICard) => card.id === currentCard.id)[0];
  }

  function checkIfCardsMatch(props: ICard) {
    const findInitialCard = findCard(props);
    const findSecondCard = findCard(findInitialCard);

    if (!firstCard.number) {
      setFirstCard(props);
    } else if (
      firstCard.number &&
      firstCard.number === findInitialCard.number
    ) {
      console.log("match");
      const updateCardMatchStatuses = cardNumbers.map((card: ICard) => {
        if (card.id === firstCard.id || card.id === findSecondCard.id) {
          return { ...card, isFlipped: false, isMatched: true };
        } else {
          return card;
        }
      });
      setFirstCard({
        number: 0,
        id: 0,
        isMatched: false,
        isFlipped: false,
      });
      setCardNumbers(updateCardMatchStatuses);
    } else if (
      firstCard.number &&
      firstCard.number !== findInitialCard.number
    ) {
      console.log("no match");
      const updateCardFlipStatuses = cardNumbers.map((card: ICard) => {
        if (card.id === firstCard.id || card.id === findSecondCard.id) {
          return { ...card, isFlipped: false };
        } else {
          return card;
        }
      });
      setCardNumbers(updateCardFlipStatuses);
      setFirstCard({
        number: 0,
        id: 0,
        isMatched: false,
        isFlipped: false,
      });
    }
  }

  // we need to compare the first and second number in App
  // we need to compare only when two cards have been flipped

  const checkIfGameComplete = cardNumbers.every(
    (card: ICard) => card.isMatched,
  );

  return (
    <>
      <section
        className={`cardContainer ${checkIfGameComplete ? "hidden" : ""}`}
      >
        {cardNumbers.map((card: ICard) => {
          return (
            <GameCard
              key={card.id}
              card={card}
              onClickEventHandler={checkIfCardsMatch}
            />
          );
        })}
      </section>
      {checkIfGameComplete ? (
        <button
          onClick={() => {
            setCardNumbers(generateCardNumbers({ min: 1, max: 36 }));
          }}
        >
          Play again
        </button>
      ) : (
        ""
      )}
    </>
  );
}
