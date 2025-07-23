export default function TokenBoxCard({
  className,
  isToken,
}: {
  className: string;
  isToken: boolean;
}) {
  return (
    <div className={className}>
      {isToken ? <div className="token"></div> : ""}
    </div>
  );
}
