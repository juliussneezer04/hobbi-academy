import React from "react";
import DefaultLayout from "../../components/defaultLayout";
import { useLocalStorage } from "@/lib/hooks/useUser";
import { getUserCourses } from "@/lib/firebase";
import { Course } from "@/interfaces";
import { User } from "firebase/auth";
import InfoCard from "@/components/infoCard";

export default function Courses() {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const [courses, setCourses] = React.useState<Course[]>([]);
  React.useEffect(() => {
    const getAllCourses = async (email: string) => {
      const courses = await getUserCourses(email);
      setCourses(courses);
    };
    if (user && user.email) {
      getAllCourses(user.email);
    }
  }, [user]);
  return (
    <DefaultLayout>
      <div className="flex flex-col space-y-16 items-center">
        <div className="flex flex-col space-y-4 w-[50%]">
          {courses.map((course, idx) => (
            <InfoCard
              key={idx}
              info={course.title}
              subtitle={course.description}
              route={`/courses/${course.id}`}
            />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
