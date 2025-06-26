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
  const [undoCounterHistory, setUndoCounterHistory] = useState<ICountHistory[]>(
    [],
  );
  const [isUndo, setIsUndo] = useState<boolean>(false);

  let keyValue = 0;

  function updateCount(counterValue: number) {
    setCount(count + counterValue);
    // updates counter history with new update user made
    setCounterHistory([
      ...counterHistory,
      {
        previousValue: count,
        updatedValue: count + counterValue,
        addedToCount: counterValue,
      },
    ]);
    setIsUndo(false);
  }

  function undoCountUpdate() {
    const latestEntry = counterHistory[counterHistory.length - 1];

    if (
      counterHistory.length &&
      undoCounterHistory.length < 50 &&
      undoCounterHistory.length >= 0
    ) {
      setCount(count - latestEntry.addedToCount);
      // simulates undo functionality - removes latest entry in counter history
      setCounterHistory(counterHistory.slice(0, counterHistory.length - 1));
      setUndoCounterHistory([...undoCounterHistory, latestEntry]);
      setIsUndo(true);
    }
  }

  function redoCountUpdate() {
    if (undoCounterHistory.length && isUndo) {
      const latestUndo = undoCounterHistory[undoCounterHistory.length - 1];

      setCount(count + latestUndo.addedToCount);
      // updates counter hstory with most recent counter history that was undo
      setCounterHistory([
        ...counterHistory,
        {
          previousValue: count,
          updatedValue: count + latestUndo.addedToCount,
          addedToCount: latestUndo.addedToCount,
        },
      ]);
      setUndoCounterHistory(
        undoCounterHistory.slice(0, undoCounterHistory.length - 1),
      );
    }
  }

  return (
    <>
      <section className="buttonContainer">
        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCount(-1)}
          addedToCount={-1}
          label={"-1"}
        />
        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCount(-10)}
          addedToCount={-10}
          label={"-10"}
        />
        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCount(-100)}
          addedToCount={-100}
          label={"-100"}
        />

        <span className="count">{count}</span>

        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCount(1)}
          addedToCount={1}
          label={"+1"}
        />
        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCount(10)}
          addedToCount={10}
          label={"+10"}
        />
        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCount(100)}
          addedToCount={100}
          label={"+100"}
        />
      </section>
      <section className="secondaryButtonContainer">
        <Button
          isDisabled={counterHistory.length === 0}
          onClickEventHandler={() => undoCountUpdate()}
          addedToCount={0}
          label={"Undo"}
        />
        <Button
          isDisabled={!(undoCounterHistory.length > 0 && isUndo)}
          onClickEventHandler={() => redoCountUpdate()}
          addedToCount={0}
          label={"Redo"}
        />
      </section>

      <section>
        {counterHistory.map((countHistory: ICountHistory) => {
          keyValue += 1;
          return (
            <div key={keyValue} className="counterHistoryContainer">
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
