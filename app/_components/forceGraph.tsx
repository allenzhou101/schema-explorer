'use client'

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import CustomLoadingIndicator from './customLoadingIndicator';
import Legend from './legend';

const ForceGraph2D = dynamic(() => import('react-force-graph').then((mod) => mod.ForceGraph2D), {
    ssr: false, 
    loading: () => <CustomLoadingIndicator/>
  });  

function ForceGraph(props: any) {
    const { width, height, ref } = useResizeDetector();

    const nodeCanvasObject = (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
        const label = node.name;
        const fontSize = 12 / globalScale; // Adjust font size based on zoom level to keep labels consistent
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Draw node shape depending on type
        if (node.type === 'schema') {
            // Draw square for 'schema'
            const size = 10; // Size of the square
            ctx.fillStyle = '#66BB6A'; // Color for 'schema'
            ctx.fillRect(node.x - size / 2, node.y - size / 2, size, size); // Draw square
        } else if (node.type === 'namespace') {
            // Draw circle for other types
            const radius = 5; // Radius of the circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = "#0085FF"; // Use node.color for different types
            ctx.fill();
        } else {
            // Draw circle for other types
            const radius = 5; // Radius of the circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = "#A665EB" // Use node.color for different types
            ctx.fill();
        }

        // Draw labels
        ctx.fillStyle = 'white'; // Color for text
        ctx.fillText(label, node.x, node.y + fontSize + 5); // Position text below the shape
    };

    return (
        <div
         ref={ref}         
         className="relative"
        >
            <Legend />
            <ForceGraph2D
                graphData={props.nodes}
                width={width || 600}
                height={height || 600}
                backgroundColor="#1E1E1E"
                linkColor={(link: any) => link.linkColor || '#F0F0F0'}
                nodeCanvasObject={nodeCanvasObject}
            />
        </div>
    )
}

export default ForceGraph;