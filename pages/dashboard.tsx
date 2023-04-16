import CourseWeb from "@/components/courseWeb";
import DefaultLayout from "@/components/defaultLayout";
import React, { useEffect } from "react";
import { getUserCourses } from "@/lib/firebase";
import { Course } from "@/interfaces";
import { useLocalStorage } from "@/lib/hooks/useUser";

export default function Dashboard() {
  const [userCourses, setUserCourses] = React.useState<Course[]>([]);
  const [user, setUser] = useLocalStorage("user", {});
  useEffect(() => {
    if (user) {
      const id = user.email ?? "";
      const getUserCourseList = async () => {
        const courses = await getUserCourses(id);
        setUserCourses(courses);
      }
      getUserCourseList();
    }
  }, [user]);
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center">
        <CourseWeb userCourses={userCourses} />
      </div>
    </DefaultLayout>
  );
}
