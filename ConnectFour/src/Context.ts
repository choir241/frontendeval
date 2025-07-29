import { createContext } from "react";

type TManageGame = {
  updateBoard: (board: null[][] | number[][]) => void;
  updateTurn: (turn: string) => void;
  turn: string;
  winner: string | number | null;
};

export const GameProvider = createContext<TManageGame>({
  updateBoard: (board: null[][] | number[][]) => board,
  updateTurn: (turn: string) => turn,
  turn: "",
  winner: "",
});

type TDropTokenButtonContext = {
  deepClone: null[][] | number[][];
  column: any[];
};

export const DropTokenButtonProvider = createContext<TDropTokenButtonContext>({
  deepClone: [],
  column: [],
});
