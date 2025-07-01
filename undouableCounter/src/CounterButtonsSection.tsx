import Button from "./Button";

export default function CounterButtonsSection({
  updateCounter,
  redoCounterUpdate,
  undoCounterUpdate,
  counter,
}: {
  updateCounter: (e: number) => void;
  counter: number;
  redoCounterUpdate: ()=> void,
  undoCounterUpdate: ()=> void,
}) {
  return (
    <>
      <section className="secondaryButtonContainer">
        <button onClick={() => undoCounterUpdate()}>Undo</button>
        <button onClick={() => redoCounterUpdate()}>Redo</button>
      </section>
      <section className="buttonContainer">
        <Button onClickEventHandler={updateCounter} addedToCounter={-100} />
        <Button onClickEventHandler={updateCounter} addedToCounter={-10} />

        <Button onClickEventHandler={updateCounter} addedToCounter={-1} />

        <span className="count">{counter}</span>

        <Button onClickEventHandler={updateCounter} addedToCounter={1} />
        <Button onClickEventHandler={updateCounter} addedToCounter={10} />
        <Button onClickEventHandler={updateCounter} addedToCounter={100} />
      </section>
    </>
  );
}
