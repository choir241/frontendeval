import { useRef, useEffect } from "react";

export default function GridCell({
  grabCoordinates,
  startDragCoordinates,
  id,
}: {
  grabCoordinates: ({
    top,
    right,
    bottom,
    left,
    x,
    y,
    id,
  }: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    x: number;
    y: number;
    id: number;
  }) => void;
  startDragCoordinates: number[];
  id: number;
}) {
  const gridRef: React.RefObject<null> = useRef(null);

  useEffect(() => {
    const top = gridRef.current.getBoundingClientRect().top;
    const bottom = gridRef.current.getBoundingClientRect().bottom;
    const right = gridRef.current.getBoundingClientRect().right;
    const left = gridRef.current.getBoundingClientRect().left;
    const x = gridRef.current.getBoundingClientRect().x;
    const y = gridRef.current.getBoundingClientRect().y;
    grabCoordinates({ top, right, bottom, left, x, y, id });
  }, [startDragCoordinates]);

  return (
    <div
      onClick={() => {
        const top = gridRef.current.getBoundingClientRect().top;
        const bottom = gridRef.current.getBoundingClientRect().bottom;
        const right = gridRef.current.getBoundingClientRect().right;
        const left = gridRef.current.getBoundingClientRect().left;
        const x = gridRef.current.getBoundingClientRect().x;
        const y = gridRef.current.getBoundingClientRect().y;
        console.log({ top, right, bottom, left, x, y, id });
      }}
      ref={gridRef}
      className="gridCard"
    >
      {id}
    </div>
  );
}
