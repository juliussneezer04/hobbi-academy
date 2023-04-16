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
  return (
    <div className="opacity-100">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl items-center">
          <span>Your {" "} <img className="ml-8 h-[80px]" src="/hobbiLogo.png" /> Journey</span>
        </h1>
        <p className="text-xl text-gray-500">
          Click on a course to learn more
        </p>
        <p className="text-gray-500">
          <i>Courses that are colored are ones you&apos;ve enrolled in!</i>
        </p>
        <div style={{ width: "100vw", height: "100vh" }}>
          <ReactFlow defaultNodes={courseNodes} nodes={courseNodes}>
            <MiniMap zoomable pannable />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
