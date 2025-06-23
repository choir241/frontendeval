export default function Button({
  label,
  onClickEventHandler,
  addedToCount,
  isDisabled,
}: {
  label: string;
  onClickEventHandler: (e: number) => void;
  addedToCount: number;
  isDisabled: boolean;
}) {
  return (
    <button
      onClick={() => onClickEventHandler(addedToCount)}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
}
