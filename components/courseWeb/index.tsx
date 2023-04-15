import { Course } from "@/interfaces";
import FloatingParticles from "./floatingParticles";
import WebBubble from "./webBubble";
import { CourseCategory } from "@/constants";
import { useAuth0 } from "@auth0/auth0-react";

interface CourseWebProps {
  userCourses: Course[];
}

export default function CourseWeb(props: CourseWebProps) {
  const { userCourses } = props;
  return (
    <>
    <FloatingParticles />
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Course Web
      </h1>
      {(userCourses || [
        {
          id: 1,
          title: "Car Modeling",
          category: CourseCategory.HANDS_ON,
          description: "Learn how to model a car in Blender",
          usersEnrolled: ["user1",],
          courseVideoName: "car-modeling.mp4",
        }
      ]).map((course) => <WebBubble key={course.id} course={course} />)}
    </div>
    </>
  );
}
