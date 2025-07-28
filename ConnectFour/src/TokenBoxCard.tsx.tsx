export default function TokenBoxCard({
  className,
  isToken,
}: {
  className: string;
  isToken: string;
}) {
  return (
    <div className={className}>
      {isToken === "yellow" || isToken === "red" ? <div className="token"></div> : ""}
    </div>
  );
}
