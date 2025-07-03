export default function Button({
  onClickEventHandler,
  className,
  label,
}: {
  onClickEventHandler: () => void;
  className: string;
  label: string;
}) {
  return (
    <button className={className} onClick={() => onClickEventHandler()}>
      {label}
    </button>
  );
}
