import React from "react";
import { classNames } from "@/lib/utils";
import { useRouter } from "next/router";

interface WebBubbleProps {
  courseNode: Node;
}

export default function WebBubble(props: WebBubbleProps) {
  const { courseNode } = props;
  const router = useRouter();
  const bubbleColor = courseNode.data.color;
  return (
    <button onClick={() => router.push(`/courses/course1`)}>
      <circle cx="50%" cy="50%" r="50%" fill={bubbleColor} />
    </button>
  );
}
