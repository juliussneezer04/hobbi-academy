import CourseWeb from "@/components/courseWeb";
import DefaultLayout from "@/components/defaultLayout";
import React, { useEffect } from "react";
import { getUser, getUserCourses } from "@/lib/firebase";
import { Course } from "@/interfaces";

export default function Dashboard() {
  const [userCourses, setUserCourses] = React.useState<Course[]>([]);
  useEffect(() => {
    const user = getUser();
    if (user) {
      const id = user.email ?? "";
      const getUserCourseList = async () => {
        const courses = await getUserCourses(id);
        setUserCourses(courses);
      }
      getUserCourseList();
    }
  }, []);
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center">
        <CourseWeb userCourses={userCourses} />
      </div>
    </DefaultLayout>
  );
}
