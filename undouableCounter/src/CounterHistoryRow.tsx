import type { ICounterHistory } from "./App";

export default function CounterHistoryRow({
  index,
  counterHistory,
}: {
  index: number;
  counterHistory: ICounterHistory;
}) {
  return (
    <div key={index} className="counterHistoryGridBox">
      <span>
        {counterHistory.addedToCounter > 0 ? "+" : "-"}{" "}
        {Math.abs(counterHistory.addedToCounter)}
      </span>
      <span>{`(${counterHistory.previousValue} -> ${counterHistory.updatedValue})`}</span>
    </div>
  );
}
