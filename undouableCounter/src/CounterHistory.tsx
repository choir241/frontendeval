import CounterHistoryRow from "./CounterHistoryRow";
import { type ICounterHistory } from "./App";

export default function CounterHistory({counterHistory}:{counterHistory: ICounterHistory[]}) {
  return (
    <div className="counterHistoryContainer">
      <section className="subCounterHistoryContainer">
        {counterHistory.map((counterHistory, index) => {
          return (
            <CounterHistoryRow index={index} counterHistory={counterHistory} />
          );
        })}
      </section>
    </div>
  );
}
