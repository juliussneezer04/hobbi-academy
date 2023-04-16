import { Course } from "@/interfaces";
import WebBubble from "./webBubble";

interface CourseWebProps {
  userCourses: Course[];
  allCourses: Course[];
}

export default function CourseWeb(props: CourseWebProps) {
  const { userCourses, allCourses } = props;
  return (
    <>
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Your Journey
        </h1>
        <div className="flex flex-row space-x-4">
          {userCourses.map((course, idx) => {
            return <WebBubble key={idx} course={course} acquired />;
          })}
          {allCourses.map((course, idx) => {
            return <WebBubble key={idx} course={course} />;
          })}
        </div>
      </div>
    </>
  );
}
