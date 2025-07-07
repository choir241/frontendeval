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
import { useState } from "react";

export interface IGrid {
  top: number;
  right: number;
  bottom: number;
  left: number;
  id: number;
  selected: string;
}

export default function App() {
  const [startDragCoordinates, setStartDragCoordinates] = useState<number[]>(
    [],
  );
  const [isDragging, setIsDragging] = useState(false);
  const [grid, setGrid] = useState<React.JSX.Element[]>(generateGrid());
  const [gridCoordinates, setGridCoordinates] = useState<IGrid[]>(
    Array(100).fill(null),
  );

  function grabCoordinates({
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
  }) {
    setGridCoordinates((prev) => {
      const newCoords = [...prev];
      newCoords[id] = { top, right, bottom, left, id, selected: "" };
      return newCoords;
    });
  }

  function generateGrid() {
    const grid = [];

    for (let i = 0; i < 100; i++) {
      grid.push(
        <GridCell
          className=""
          id={i}
          key={i}
          grabCoordinates={grabCoordinates}
        />,
      );
    }

    return grid;
  }

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

    const findSelectedGrids = gridCoordinates.map((gridBox) => {
      const fullyContained =
        gridBox.left >= xMin &&
        gridBox.right <= xMax &&
        gridBox.top >= yMin &&
        gridBox.bottom <= yMax;

      if (fullyContained) {
        return { ...gridBox, selected: "selected" };
      } else {
        return gridBox;
      }
    });

    const updatedGrid = findSelectedGrids.map((gridBox) => {
      return (
        <GridCell
          className={gridBox.selected}
          id={gridBox.id}
          key={gridBox.id}
          grabCoordinates={grabCoordinates}
        />
      );
    });

    setGrid(updatedGrid);
  }

  return (
    <div
      className="mainContainer"
      onMouseDown={(e) => {
        setGrid(generateGrid());
        setStartDragCoordinates([e.clientX, e.clientY]);
        setIsDragging(true);
      }}
      onMouseMove={(e) => {
        if (isDragging) {
          checkForGridSelection({
            xStart: startDragCoordinates[0],
            yStart: startDragCoordinates[1],
            xEnd: e.clientX,
            yEnd: e.clientY,
          });
        }
      }}
      onMouseUp={(e) => {
        setIsDragging(false);
        setStartDragCoordinates([...startDragCoordinates, 0]);
        checkForGridSelection({
          xStart: startDragCoordinates[0],
          yStart: startDragCoordinates[1],
          xEnd: e.clientX,
          yEnd: e.clientY,
        });
      }}
    >
      <section className="gridContainer">{grid}</section>
    </div>
  );
}
