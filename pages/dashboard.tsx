import CourseWeb from "@/components/courseWeb";
import DefaultLayout from "@/components/defaultLayout";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { getUserCourses } from "@/lib/firebase";
import { Course } from "@/interfaces";
  

export default function Dashboard() {
  const { user } = useAuth0();
  const [userCourses, setUserCourses] = React.useState<Course[]>([]);
  console.log("USER", user);
  useEffect(() => {
    if (user) {
      const id = user.email ?? "";
      const getUserCourseList = async () => {
        const courses = await getUserCourses(id);
        setUserCourses(courses);
        console.log("courses", courses);
      }
      getUserCourseList();
    }
  }, [user])
  return (
      <DefaultLayout>
        <div className="flex flex-col items-center">
          <CourseWeb userCourses={userCourses} />
        </div>
      </DefaultLayout>
  );
}
