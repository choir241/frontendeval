// GameCard should re-render, but should not cause App to re-render.

import { type ICard } from "./App";
import { useState } from "react";

export default function GameCard({
  props,
  clickHandler,
}: {
  props: ICard;
  clickHandler: (e: ICard) => void;
}) {
  return (
    <div
      className={`card ${props.isMatched ? "matched" : ""}`}
      onClick={() => {
        props.isFlipped = true;
        clickHandler(props);
      }}
    >
      {props.number}
      {props.isFlipped ? props.number : ""}
    </div>
  );
}
