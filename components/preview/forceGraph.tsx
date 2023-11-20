'use client'

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import CustomLoadingIndicator from '../customLoadingIndicator';
import Legend from './legend';
import { parseYamlToNodes } from '@/services/yamlParsing';
import { Link, Node } from '@/util/types';
import sectionHeight from '@/util/constants';

const ForceGraph2D = dynamic(() => import('react-force-graph').then((mod) => mod.ForceGraph2D), {
    ssr: false, 
    loading: () => <CustomLoadingIndicator/>
  });  

interface ForceGraphProps {
    schema: string | undefined;
}

function ForceGraph(props: ForceGraphProps) {

    const { schema } = props;

    const { width, height, ref } = useResizeDetector();

    const [nodes, setNodes] = useState<{
        nodes: Node[];
        links: Link[];
    } | undefined>(undefined);

    useEffect(() => {
        if (schema !== undefined) {
            const parsedNodes = parseYamlToNodes(schema);
            setNodes(parsedNodes);
        }
    }, [schema]);

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
    if (nodes === undefined) return (
        <CustomLoadingIndicator />
    )
    if (nodes.nodes.length === 0) return (
        <div className={`flex h-[${sectionHeight}px] items-center justify-center`}>
            <p className="text-gray-500 text-xs">Your schema doesn&apos;t have any nodes.</p>
        </div>
    )

    return (
        <div
         ref={ref}         
         className="relative"
        >
            <Legend />
            <ForceGraph2D
                graphData={nodes}
                width={width || 600}
                height={height || sectionHeight}
                backgroundColor="#1E1E1E"
                linkColor={(link: any) => link.linkColor || '#F0F0F0'}
                nodeCanvasObject={nodeCanvasObject}
            />
        </div>
    )
}

export default ForceGraph;