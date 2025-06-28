import { useRef, useEffect } from "react";

export default function GridCell({
  grabCoordinates,
}: {
  grabCoordinates: ({
    top,
    right,
    bottom,
    left,
    x,
    y,
  }: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    x: number;
    y: number;
  }) => void;
}) {
  const gridRef: React.RefObject<null> = useRef(null);

  useEffect(() => {
    if (gridRef && gridRef.current) {
      const top = gridRef.current.getBoundingClientRect().top;
      const bottom = gridRef.current.getBoundingClientRect().bottom;
      const right = gridRef.current.getBoundingClientRect().right;
      const left = gridRef.current.getBoundingClientRect().left;
      const x = gridRef.current.getBoundingClientRect().x;
      const y = gridRef.current.getBoundingClientRect().y;
      grabCoordinates({ top, right, bottom, left, x, y });
    }
  }, []);

  return <div ref={gridRef} className="gridCard"></div>;
}
