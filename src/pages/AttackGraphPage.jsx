import React, { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  MarkerType
} from "reactflow";
import "reactflow/dist/style.css";

export default function AttackGraphPage() {

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/attack-path")
      .then(res => res.json())
      .then(data => {
        if (data && data.paths) {
          buildGraph(data.paths);
        }
      });
  }, []);

  const buildGraph = (paths) => {

    const generatedNodes = [];
    const generatedEdges = [];
    const nodeSet = new Set();

    paths.forEach((path, index) => {

      path.forEach((node, i) => {

        if (!nodeSet.has(node)) {

          nodeSet.add(node);

          generatedNodes.push({
            id: node,
            data: { label: node },
            position: {
              x: Math.random() * 800,
              y: Math.random() * 500
            },
            style: {
              background: "#0f172a",
              color: "#22d3ee",
              border: "2px solid #22d3ee",
              borderRadius: "50%",
              width: 80,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px #22d3ee"
            }
          });
        }

        if (i > 0) {
          generatedEdges.push({
            id: `${path[i - 1]}-${node}`,
            source: path[i - 1],
            target: node,
            animated: true,
            style: { stroke: "#ef4444", strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#ef4444"
            }
          });
        }

      });

    });

    setNodes(generatedNodes);
    setEdges(generatedEdges);
  };

  return (
    <div className="p-6 text-white h-[85vh]">

      <h2 className="text-3xl text-cyan-400 font-bold mb-4">
        🚨 Live Attack Network
      </h2>

      <div className="bg-slate-900 rounded-xl shadow-xl h-full border border-slate-700">

        {nodes.length > 0 ? (
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <MiniMap />
            <Controls />
            <Background gap={20} size={1} color="#1e293b" />
          </ReactFlow>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg">
            Waiting for attack activity...
          </div>
        )}

      </div>

    </div>
  );
}