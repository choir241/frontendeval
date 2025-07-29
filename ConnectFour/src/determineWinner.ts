export function determineWinner({
  winner,
}: {
  winner: null | number | string;
}) {
  if (winner == 1) {
    return "Red wins!";
  } else if (winner == 2) {
    return "Yellow wins!";
  } else if (winner == "draw") {
    return "Draw!";
  }
}
