import React from "react";
import ReactFlow, {
  MiniMap,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";

interface CourseWebProps {
  courseNodes: Node[];
}

export default function CourseWeb(props: CourseWebProps) {
  const { courseNodes } = props;
  const edges = [
    { id: "e1-2", source: "forum1", target: "forum2", animated: true },
    // { id: "e1-3", source: "forum1", target: "forum3", animated: true },
    // { id: "e1-4", source: "forum1", target: "forum4", animated: true },
    // { id: "e1-5", source: "forum1", target: "forum5", animated: true },
    // { id: "e1-6", source: "forum1", target: "forum6", animated: true },
    // { id: "e1-7", source: "forum1", target: "forum7", animated: true },
    // { id: "e1-8", source: "forum1", target: "forum8", animated: true },
    // { id: "e1-9", source: "forum1", target: "forum9", animated: true },
    // { id: "e2-3", source: "forum2", target: "forum3", animated: true },
    // { id: "e2-4", source: "forum2", target: "forum4", animated: true },
    // { id: "e2-5", source: "forum2", target: "forum5", animated: true },
    // { id: "e2-6", source: "forum2", target: "forum6", animated: true },
    // { id: "e2-7", source: "forum2", target: "forum7", animated: true },
    // { id: "e2-8", source: "forum2", target: "forum8", animated: true },
    // { id: "e2-9", source: "forum2", target: "forum9", animated: true },
    // { id: "e3-4", source: "forum3", target: "forum4", animated: true },
    // { id: "e3-5", source: "forum3", target: "forum5", animated: true },
    // { id: "e3-6", source: "forum3", target: "forum6", animated: true },
    // { id: "e3-7", source: "forum3", target: "forum7", animated: true },
    // { id: "e3-8", source: "forum3", target: "forum8", animated: true },
    // { id: "e3-9", source: "forum3", target: "forum9", animated: true },
    // { id: "e4-5", source: "forum4", target: "forum5", animated: true },
    // { id: "e4-6", source: "forum4", target: "forum6", animated: true },
    // { id: "e4-7", source: "forum4", target: "forum7", animated: true },
    // { id: "e4-8", source: "forum4", target: "forum8", animated: true },
    // { id: "e4-9", source: "forum4", target: "forum9", animated: true },
    // { id: "e5-6", source: "forum5", target: "forum6", animated: true },
    // { id: "e5-7", source: "forum5", target: "forum7", animated: true },
    // { id: "e5-8", source: "forum5", target: "forum8", animated: true },
    // { id: "e5-9", source: "forum5", target: "forum9", animated: true },
    // { id: "e6-7", source: "forum6", target: "forum7", animated: true },
    // { id: "e6-8", source: "forum6", target: "forum8", animated: true },
    // { id: "e6-9", source: "forum6", target: "forum9", animated: true },
    // { id: "e7-8", source: "forum7", target: "forum8", animated: true },
    // { id: "e7-9", source: "forum7", target: "forum9", animated: true },
    // { id: "e8-9", source: "forum8", target: "forum9", animated: true },
  ];
  return (
    <div className="opacity-100">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Your Journey
        </h1>
        <div style={{ width: "100vw", height: "100vh" }}>
          <ReactFlow defaultNodes={courseNodes} nodes={courseNodes} edges={edges}>
            <MiniMap zoomable pannable />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
