"use client"

import { useEffect, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { useResizeDetector, withResizeDetector } from 'react-resize-detector';

function ForceGraph(props: any) {
    const { width, height, ref } = useResizeDetector();
    const forceRef = useRef<any>(null);

    useEffect(() => {
        if (forceRef.current !== null) {
            forceRef.current.d3Force("charge").strength(-200);
        }
    });
    return (
        <div ref={ref}>
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

export default ForceGraph;