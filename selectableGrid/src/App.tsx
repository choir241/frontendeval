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

export default function App() {
  const [startDragCoordinates, setStartDragCoordinates] = useState<number[]>(
    []
  );
  const [endDragCoordinates, setEndDragCoordinates] = useState<number[]>([]);
  const [grid, setGrid] = useState<React.JSX.Element[]>([]);

  useEffect(() => {
    console.log(startDragCoordinates);
    console.log(endDragCoordinates);

    const xStart = startDragCoordinates[0];
    const yStart = startDragCoordinates[1];
    const xEnd = endDragCoordinates[0];
    const yEnd = endDragCoordinates[1];

    let missingSelectBoxCornerCoordinate:number[] = [];
    let otherMissingSelectBoxCornerCoordinate:number[] = [];
    if(xStart > xEnd){
      // we dragged from the right
      // we dropped at the left
      if(yStart > yEnd){
      // we dragged from the bottom
      // we dropped at the top

      // we dragged from right bottom to left top
      
      // right top 
      missingSelectBoxCornerCoordinate = [xStart, yEnd];
      // left bottom
      otherMissingSelectBoxCornerCoordinate = [xEnd, yStart];

      }else if(yStart < yEnd){
      // we dragged from the top
      // we dropped at the bottom

      // we dragged from right top to left bottom

      // left top 
      missingSelectBoxCornerCoordinate = [xEnd, yStart];
      // right bottom
      otherMissingSelectBoxCornerCoordinate = [xStart, yEnd];
      }
    }else if(xStart < xEnd){
      // we dragged from the left
      // we dropped at the right
      if(yStart > yEnd){
      // we dragged from the bottom
      // we dropped at the top

      // we dragged from left bottom to right top
      
      // right bottom
      missingSelectBoxCornerCoordinate = [xStart, yEnd];
      // left top
      otherMissingSelectBoxCornerCoordinate = [xEnd, yStart];

      }else if(yStart < yEnd){
      // we dragged from the top
      // we dropped at the bottom

      // we dragged from left top to right bottom

      // right top
      missingSelectBoxCornerCoordinate = [xEnd, yStart];
      // left bottom
      otherMissingSelectBoxCornerCoordinate = [xStart, yEnd];
      }
    }

    //top left
    //top right
    //bottom left
    //bottom right

    // dragged from top right to bottom left
    // example: [461, 272] -> right top (x,y) [a,b]
    // [224, 486] -> left bottom (x,y) [c, d]

    // to form a square, left top (x,y) would be [224, 272], right bottom (x,y) would be [461, 486]
    // [c, b], [a, d]

    // dragged from bottom right to top left
    // example: [490, 596] right bottom [a,b]
    // [136, 235] left top [c,d]

    // form square, right top is [490, 235] and left bottom is [136, 596]
    // [a, d], [c, b]


    // we need a way to determine what is top, left, right, and bottom
    // so how do we do that?

    // we know right will always be greater than left
    // we know what top will always be greater than bottom

    // if dragged coordinate x is greater han the start coordinate x, then dragged coordinate is at the right, and start is at the left
  

    //for the end drag coordinates, wherever you land, it's x axis will be the same value as the other vertical end of the "square"
    // ie. if you end dragging at the top left, then bottom left x axis will be the same value
  }, [startDragCoordinates, endDragCoordinates]);

  function grabCoordinates({x,y}:{x: number,y: number}){
    return [x,y];
  }

  function generateGrids(){
    const grid = [];
    for(let i = 0; i < 100; i++){
      grid.push(
        <GridCell key = {i} grabCoordinates={grabCoordinates}/>
      );
    }
    setGrid(grid);
  }

  useEffect(()=>{
    generateGrids();
  },[]);

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

      <section className="gridContainer">
        {grid.map((element)=>{
          return element
        })}
      </section>


    </div>
  );
}
