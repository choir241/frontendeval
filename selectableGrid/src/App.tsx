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
}

export default function App() {
  const [startDragCoordinates, setStartDragCoordinates] = useState<number[]>(
    []
  );
  const [endDragCoordinates, setEndDragCoordinates] = useState<number[]>([]);
  const [grid, setGrid] = useState<React.JSX.Element[]>([]);
  const [gridCoordinates, setGridCoordinates] = useState<IGrid>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    console.log(startDragCoordinates);
    console.log(endDragCoordinates);

    const xStart = startDragCoordinates[0];
    const yStart = startDragCoordinates[1];
    const xEnd = endDragCoordinates[0];
    const yEnd = endDragCoordinates[1];

    let missingSelectBoxCornerCoordinate: number[] = [];
    let otherMissingSelectBoxCornerCoordinate: number[] = [];

    if (xStart > xEnd) {
      // we dragged from the right
      // we dropped at the left
      if (yStart > yEnd) {
        // we dragged from the bottom
        // we dropped at the top
        // we dragged from right bottom to left top

        // right top
        missingSelectBoxCornerCoordinate = [xStart, yEnd];
        // left bottom
        otherMissingSelectBoxCornerCoordinate = [xEnd, yStart];
      } else if (yStart < yEnd) {
        // we dragged from the top
        // we dropped at the bottom
        // we dragged from right top to left bottom

        // left top
        missingSelectBoxCornerCoordinate = [xEnd, yStart];
        // right bottom
        otherMissingSelectBoxCornerCoordinate = [xStart, yEnd];
      }
    } else if (xStart < xEnd) {
      // we dragged from the left
      // we dropped at the right
      if (yStart > yEnd) {
        // we dragged from the bottom
        // we dropped at the top
        // we dragged from left bottom to right top

        // right bottom
        missingSelectBoxCornerCoordinate = [xStart, yEnd];
        // left top
        otherMissingSelectBoxCornerCoordinate = [xEnd, yStart];
      } else if (yStart < yEnd) {
        // we dragged from the top
        // we dropped at the bottom
        // we dragged from left top to right bottom

        // right top
        missingSelectBoxCornerCoordinate = [xEnd, yStart];
        // left bottom
        otherMissingSelectBoxCornerCoordinate = [xStart, yEnd];
      }
    }
  }, [startDragCoordinates, endDragCoordinates]);

  useEffect(() => {
    function grabCoordinates({
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
    }) {
      if (startDragCoordinates.length) {
        setGridCoordinates({ top, right, bottom, left, x, y });
      }
    }

    const grid = [];
    for (let i = 0; i < 100; i++) {
      grid.push(<GridCell key={i} grabCoordinates={grabCoordinates} />);
    }
    setGrid(grid);
      console.log(gridCoordinates);
  }, [startDragCoordinates, gridCoordinates]);

  return (
    <div
      className="mainContainer"
      onMouseDown={(e) => {
        setStartDragCoordinates([e.screenX, e.screenY]);
        setEndDragCoordinates([]);
      }}
      onMouseUp={(e) => {
        setEndDragCoordinates([e.screenX, e.screenY]);
      }}
    >
      <section className="gridContainer">{grid}</section>
    </div>
  );
}
