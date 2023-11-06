'use client'


import dynamic from 'next/dynamic';
import { useResizeDetector } from 'react-resize-detector';

const ForceGraph2D = dynamic(() => import('react-force-graph').then((mod) => mod.ForceGraph2D), {
    ssr: false, // This line is important. It tells Next.js to only import this component on the client side.
  });  

function ForceGraph(props: any) {
    const { width, height, ref } = useResizeDetector();

    return (
        <div
         ref={ref}
         >
            <ForceGraph2D
               graphData={props.nodes}
               width={width || 600}
               height={height || 600}
               backgroundColor="aliceblue"
               nodeLabel="id"
            />
        </div>
    )
}

export default ForceGraph;