// The count should begin at 0
// Clicking the +1, +10, +100 buttons should add 1, 10, and 100 to the count, respectively
// Clicking the -1, -10, -100 buttons should subtract 1, 10, and 100 from the count, respectively
// Clicking any + or - button should show a new entry in the history,
//  in the format: ACTION (BEFORE -> AFTER) (e.g. +1 (0 -> 1))
// Clicking the 'Undo' button should undo the last action.
// Clicking undo/redo should remove and re-add entries to the history respectively
// For example, if the user just clicked '+10', clicking undo should subtract 10 from the count
// The user should be able to undo up to the last 50 actions
// The 'Redo' button should be greyed out until the user clicks 'Undo'
// Clicking the 'Redo' button should redo the last action the user undid. For example, if the user clicked '+10', clicking undo would subtract 10, then clicking redo would add 10 again

import { useState } from "react";
import Button from "./Button";

export default function App() {
  interface ICountHistory {
    previousValue: number;
    updatedValue: number;
    addedToCount: number;
  }

  const [count, setCount] = useState<number>(0);
  const [counterHistory, setCounterHistory] = useState<ICountHistory[]>([]);
  const [archivedCounterHistory, setArchivedCounterHistory] = useState<
    ICountHistory[]
  >([]);
  const [undoCount, setUndoCount] = useState<number>(0);

  function updateCount(counterValue: number) {
    let updatedValue = count + counterValue;
    let updatedCounterHistory = [
      ...counterHistory,
      { previousValue: count, updatedValue, addedToCount: counterValue },
    ];
    setCount(updatedValue);

    setCounterHistory(updatedCounterHistory);
    setArchivedCounterHistory(updatedCounterHistory);
  }

  function undoCountUpdate() {
    const updatedCounterHistoryWithUndo = counterHistory.slice(
      0,
      counterHistory.length - 1,
    );
    const latestEntry = counterHistory[counterHistory.length - 1];

    if (undoCount <= 50 && undoCount >= 0) {
      if (counterHistory.length) {
        setCount(count - latestEntry.addedToCount);
        setCounterHistory(updatedCounterHistoryWithUndo);
        setUndoCount(undoCount + 1);
      }
    }
  }

  function redoCountUpdate() {
    if (undoCount > 0) {
      const latestUndo = archivedCounterHistory[undoCount - 1];
      let updatedValue = count + latestUndo.addedToCount;
      let updatedCounterHistory = [
        ...counterHistory,
        {
          previousValue: count,
          updatedValue,
          addedToCount: latestUndo.addedToCount,
        },
      ];
      setCount(updatedValue);
      setCounterHistory(updatedCounterHistory);
      if (undoCount > 0) {
        setUndoCount(undoCount - 1);
      }
    }
  }

  return (
    <>
      <section className="buttonContainer">
        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCount(-1)}
          label={"-1"}
        />
        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCount(-10)}
          label={"-10"}
        />
        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCount(-100)}
          label={"-100"}
        />

        <span className="count">{count}</span>

        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCount(1)}
          label={"+1"}
        />
        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCount(10)}
          label={"+10"}
        />
        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCount(100)}
          label={"+100"}
        />
      </section>
      <section className="secondaryButtonContainer">
        <Button
          isDisabled={counterHistory.length === 0}
          onClickEventHandler={() => undoCountUpdate()}
          label={"Undo"}
        />
        <Button
          isDisabled={!(undoCount > 0)}
          onClickEventHandler={() => redoCountUpdate()}
          label={"Redo"}
        />
      </section>

      <section>
        {counterHistory.map((countHistory: ICountHistory) => {
          return (
            <div className="counterHistoryContainer">
              <span>
                {countHistory.addedToCount > 0 ? "+" : "-"}{" "}
                {Math.abs(countHistory.addedToCount)}
              </span>
              <span>{`(${countHistory.previousValue} -> ${countHistory.updatedValue})`}</span>
            </div>
          );
        })}
      </section>
    </>
  );
}
