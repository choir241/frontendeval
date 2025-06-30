import { useRef, useEffect } from "react";

export default function GridCell({
  grabCoordinates,
  id,
  className,
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
  id: number;
  className: string;
}) {
  const gridRef: React.RefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      const top = gridRef.current.getBoundingClientRect().top;
      const bottom = gridRef.current.getBoundingClientRect().bottom;
      const right = gridRef.current.getBoundingClientRect().right;
      const left = gridRef.current.getBoundingClientRect().left;
      const x = gridRef.current.getBoundingClientRect().x;
      const y = gridRef.current.getBoundingClientRect().y;
      grabCoordinates({ top, right, bottom, left, x, y, id });
    }
  }, []);

  return <div ref={gridRef} className={`gridCard ${className}`}></div>;
}
