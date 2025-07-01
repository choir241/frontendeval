export default function Button({
  addedToCounter,
  onClickEventHandler,
}: {
  addedToCounter: number;
  onClickEventHandler: (e: number) => void;
}) {
  return (
    <button onClick={() => onClickEventHandler(addedToCounter)}>
      {addedToCounter}
    </button>
  );
}
