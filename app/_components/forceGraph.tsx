"use client"

import { useEffect, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { withResizeDetector } from 'react-resize-detector';

function ForceGraph(props: any) {
    const { width = 0, height = 0 } = props;
    console.log(width, height);
    const forceRef = useRef<any>(null);
    useEffect(() => {
        if (forceRef.current !== null) {
            forceRef.current.d3Force("charge").strength(-200);
        }
    });
    return (
        <div>
            <ForceGraph2D
               graphData={props.nodes}
               width={width}
               height={height}
               backgroundColor="aliceblue"
               nodeLabel="id"
               ref={forceRef}
            />
        </div>
    )
}

export default withResizeDetector(ForceGraph);