import { useRef, useEffect, useState } from "react"

export default function GridCell({grabCoordinates}:{grabCoordinates: ({x,y}:{x: number,y: number})=> number[]}){

    const gridRef = useRef(null);
    const [coordinates, setCoordinates] = useState<number[]>([]);

    useEffect(()=>{
        const x = gridRef.current.getBoundingClientRect().x;
        const y = gridRef.current.getBoundingClientRect().y;
        setCoordinates([x,y]);
    },[])

    grabCoordinates({x: coordinates[0], y: coordinates[1]});

    return(
        <div ref={gridRef} className="gridCard">
        </div>
    )
}