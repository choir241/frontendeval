export default function Token({ box }: { box: number | null }) {
  // Use a more appropriate mapping for token styles
  const tokenStyle = {
    null: "emptyBox", // Use the actual `null` value as the key
    1: "red",
    2: "yellow"
  };

  // If box is null, default to "emptyBox"
  const boxClass = tokenStyle[box as keyof typeof tokenStyle] || "emptyBox";

  return (
    <div>
      <div className={boxClass}>
        <div className="token"></div>
      </div>
    </div>
  );
}
