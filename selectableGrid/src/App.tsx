// Requirements
// 10x10 grid with a single pixel black border/gridlines
// Each grid cell should be 20x20 pixels (including the border)

// User can drag (invisible) bounding box to select cells in the grid

// Cell is selected if it is completely within the bounding box

// Selected cells should be highlighted blue
// Cells should remain selected on releasing the mouse
// All cells should be unselected if the user starts dragging to create a new bounding box
// User can start dragging to create a bounding box from anywhere on the page

// track mouse location (movement) the moment the user is clicking and dragging

// 1. track mouse location
// 2. the moment the user starts dragging
// 3. the moment the user stops dragging

// 4. grab the elements coordinates so we know if its inside of the "invisible box" we're creating by dragging and dropping the mouse
// 5. create the area of selection as a box using coordinates

import GridCell from "./GridCell";
import { useState, useEffect } from "react";

export interface IGrid {
  top: number;
  right: number;
  bottom: number;
  left: number;
  x: number;
  y: number;
  id: number;
}

export default function App() {
  const [startDragCoordinates, setStartDragCoordinates] = useState<number[]>(
    []
  );
  const [grid, setGrid] = useState<React.JSX.Element[]>([]);
  const [gridCoordinates, setGridCoordinates] = useState<IGrid[]>(
    Array(100).fill(null)
  );

  function createSelectionBox({ x, y }: { x: number; y: number }) {
    const xStart = startDragCoordinates[0];
    const yStart = startDragCoordinates[1];
    const xEnd = x;
    const yEnd = y;

    checkForGridSelection({
      xStart,
      yStart,
      xEnd,
      yEnd,
    });
  }

  useEffect(() => {
    function grabCoordinates({
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
    }) {
      setGridCoordinates((prev) => {
        const newCoords = [...prev];
        newCoords[id] = { top, right, bottom, left, x, y, id };
        return newCoords;
      });
    }

    const grid = [];

    for (let i = 0; i < 100; i++) {
      grid.push(
        <GridCell
          id={i}
          key={i}
          grabCoordinates={grabCoordinates}
          startDragCoordinates={startDragCoordinates}
        />
      );
    }
    setGrid(grid);
  }, [gridCoordinates]);

  function checkForGridSelection({
    xStart,
    yStart,
    xEnd,
    yEnd,
  }: {
    xEnd: number;
    yEnd: number;
    xStart: number;
    yStart: number;
  }) {
    const xMin = Math.min(xStart, xEnd);
    const xMax = Math.max(xStart, xEnd);
    const yMin = Math.min(yStart, yEnd);
    const yMax = Math.max(yStart, yEnd);

    const findSelectedGrids = gridCoordinates.filter((gridBox) => {
      const fullyContained =
        gridBox.left >= xMin &&
        gridBox.right <= xMax &&
        gridBox.top >= yMin &&
        gridBox.bottom <= yMax;

      console.log(fullyContained ? gridBox.id : "");

      return fullyContained;
    });
    console.log(findSelectedGrids);
  }

  return (
    <div
      className="mainContainer"
      onMouseDown={(e) => {
        setStartDragCoordinates([e.clientX, e.clientY]);
      }}
      onMouseUp={(e) => {
        createSelectionBox({ x: e.clientX, y: e.clientY });
      }}
    >
      <section className="gridContainer">{grid}</section>
    </div>
  );
}
