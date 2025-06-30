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
  interface ICounterHistory {
    previousValue: number;
    updatedValue: number;
    addedToCounter: number;
  }

  const [counter, setCounter] = useState(0);
  const [counterHistory, setCounterHistory] = useState<ICounterHistory[]>([]);
  const [undoCounterHistory, setUndoCounterHistory] = useState<
    ICounterHistory[]
  >([]);

  function updateCounter(counterValue: number) {
    setCounter(counter + counterValue);
    // updates counter history with new update user made
    setCounterHistory([
      ...counterHistory,
      {
        previousValue: counter,
        updatedValue: counter + counterValue,
        addedToCounter: counterValue,
      },
    ]);
    setUndoCounterHistory([]);
  }

  function undoCounterUpdate() {
    const latestEntry = counterHistory[counterHistory.length - 1];

    if (
      counterHistory.length &&
      undoCounterHistory.length < 50
    ) {
      setCounter(counter - latestEntry.addedToCounter);
      // simulates undo functionality - removes latest entry in counter history
      setCounterHistory(counterHistory.slice(0, counterHistory.length - 1));
      setUndoCounterHistory([...undoCounterHistory, latestEntry]);

    }
  }

  function redoCounterUpdate() {
    if (undoCounterHistory.length) {
      const latestUndo = undoCounterHistory[undoCounterHistory.length - 1];

      setCounter(counter + latestUndo.addedToCounter);
      // updates counter hstory with most recent counter history that was undo
      setCounterHistory([
        ...counterHistory,
        {
          previousValue: counter,
          updatedValue: counter + latestUndo.addedToCounter,
          addedToCounter: latestUndo.addedToCounter,
        },
      ]);
      setUndoCounterHistory(
        undoCounterHistory.slice(0, undoCounterHistory.length - 1)
      );
    }
  }

  return (
    <>
      <section className="secondaryButtonContainer">
        <Button
          isDisabled={counterHistory.length === 0}
          onClickEventHandler={() => undoCounterUpdate()}
          addedToCounter={0}
          label={"Undo"}
        />
        <Button
          isDisabled={!(undoCounterHistory.length > 0)}
          onClickEventHandler={() => redoCounterUpdate()}
          addedToCounter={0}
          label={"Redo"}
        />
      </section>
      <section className="buttonContainer">
        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCounter(-100)}
          addedToCounter={-100}
          label={"-100"}
        />
        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCounter(-10)}
          addedToCounter={-10}
          label={"-10"}
        />

        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCounter(-1)}
          addedToCounter={-1}
          label={"-1"}
        />

        <span className="count">{counter}</span>

        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCounter(1)}
          addedToCounter={1}
          label={"+1"}
        />
        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCounter(10)}
          addedToCounter={10}
          label={"+10"}
        />
        <Button
          isDisabled={false}
          onClickEventHandler={() => updateCounter(100)}
          addedToCounter={100}
          label={"+100"}
        />
      </section>

      <div className="flex justifyCenter">
        <div className="counterHistoryContainer">
          <section className="subCounterHistoryContainer">
            {counterHistory.map((counterHistory, index) => {
              return (
                <div key={index} className="counterHistoryGridBox">
                  <span>
                    {counterHistory.addedToCounter > 0 ? "+" : "-"}{" "}
                    {Math.abs(counterHistory.addedToCounter)}
                  </span>
                  <span>{`(${counterHistory.previousValue} -> ${counterHistory.updatedValue})`}</span>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
}
