export default function Button({
  label,
  onClickEventHandler,
  isDisabled,
}: {
  label: string;
  onClickEventHandler: (e: number) => void;
  isDisabled: boolean;
}) {
  return (
    <button onClick={(e) => onClickEventHandler(e)} disabled={isDisabled}>
      {label}
    </button>
  );
}
