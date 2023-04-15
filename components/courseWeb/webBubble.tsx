import React from "react";
import { COURSE_CATEGORY_TO_COLOR } from "@/constants";
import { Course } from "@/interfaces";
import { classNames } from "@/lib/utils";
import { useRouter } from "next/router";

interface WebBubbleProps {
  course: Course;
}

export default function WebBubble(props: WebBubbleProps) {
  const { course } = props;
  const router = useRouter();
  const bubbleColorClassName = COURSE_CATEGORY_TO_COLOR[course.category]
  return (
    <button
      onClick={() => router.push(`/courses/${course.id}`)}
      className={classNames("w-32 h-32 rounded-full border-black border-r-4", bubbleColorClassName)}
    />
  );
}
