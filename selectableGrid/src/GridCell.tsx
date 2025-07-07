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
    id,
  }: {
    top: number;
    right: number;
    bottom: number;
    left: number;
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
      grabCoordinates({ top, right, bottom, left, id });
    }
  }, []);

  return <div ref={gridRef} className={`gridCard ${className}`}></div>;
}
