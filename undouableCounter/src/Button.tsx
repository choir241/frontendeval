export default function Button({
  label,
  onClickEventHandler,
  addedToCounter,
  isDisabled,
}: {
  label: string;
  onClickEventHandler: (e: number) => void;
  addedToCounter: number;
  isDisabled: boolean;
}) {
  return (
    <button
      onClick={() => onClickEventHandler(addedToCounter)}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
}
