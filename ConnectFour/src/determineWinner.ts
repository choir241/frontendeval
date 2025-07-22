export function determineWinner({
  turn,
  winner,
}: {
  turn: number;
  winner: number | null;
}) {
  if (turn === 1 && winner === 0) {
    return "Red's turn";
  } else if (turn === 2 && winner === 0) {
    return "Yellow's turn";
  } else if (winner === 1) {
    return "Red won!";
  } else if (winner === 2) {
    return "Yellow won!";
  } else if (winner !== 0) {
    return "Draw!";
  }
}
