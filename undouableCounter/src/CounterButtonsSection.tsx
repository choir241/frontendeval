import CounterButton from "./CounterButton";

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
        <CounterButton onClickEventHandler={updateCounter} addedToCounter={-100} />
        <CounterButton onClickEventHandler={updateCounter} addedToCounter={-10} />

        <CounterButton onClickEventHandler={updateCounter} addedToCounter={-1} />

        <span className="count">{counter}</span>

        <CounterButton onClickEventHandler={updateCounter} addedToCounter={1} />
        <CounterButton onClickEventHandler={updateCounter} addedToCounter={10} />
        <CounterButton onClickEventHandler={updateCounter} addedToCounter={100} />
      </section>
    </>
  );
}
