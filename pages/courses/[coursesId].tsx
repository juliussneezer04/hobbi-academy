import { useRouter } from "next/router";
import React from "react";

export default function Course() {
  const router = useRouter();
  const { courseId } = router.query;
  return (
    <div>
      <h1>Course {courseId}</h1>
    </div>
  );
}
