import Button from "./Button";

export default function CounterButtonsSection({updateCounter, counter}:{updateCounter:(e:number)=>void, counter: number}) {
  return (
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
  );
}
