import React from "react";
import { COURSE_CATEGORY_TO_COLOR, CourseCategory } from "@/constants";
import { Course } from "@/interfaces";
import { classNames } from "@/lib/utils";
import { useRouter } from "next/router";

interface WebBubbleProps {
  course: Course;
  acquired?: boolean;
}

export default function WebBubble(props: WebBubbleProps) {
  const { course, acquired } = props;
  const router = useRouter();
  const bubbleColorClassName = COURSE_CATEGORY_TO_COLOR[course.category];
  return (
    <button onClick={() => router.push(`/courses/${course.id}`)}>
      <div
        className={classNames(
          "w-24 h-24 rounded-full z-50 opacity-100 border-black border-r-4 shadow-md",
          acquired ? `bg-${bubbleColorClassName}-500 animate-pulse` : "bg-gray-600",
        )}
      ></div>
    </button>
  );
}
