export default function Token({ box }: { box: number | null }) {
  function toggleTokenStyle() {
    if (box === null) {
      return "emptyBox";
    }

    if (box === 1) {
      return "red";
    } else if (box === 2) {
      return "yellow";
    }
  }

  return (
    <div>
      <div className={toggleTokenStyle()}>
        {box === 1 || box === 2 ? <div className="token"></div> : ""}
      </div>
    </div>
  );
}
