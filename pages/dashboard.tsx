import CourseWeb from "@/components/courseWeb";
import DefaultLayout from "@/components/defaultLayout";
import React, { useEffect } from "react";
import { getUserCourses } from "@/lib/firebase";
import { Course } from "@/interfaces";
import { useLocalStorage } from "@/lib/hooks/useUser";
import { User } from "firebase/auth";
import { RoomProvider } from "@/liveblocks.config";
import LiveCursorWrapper from "@/components/liveCursorWrapper";

export default function Dashboard() {
  const [userCourses, setUserCourses] = React.useState<Course[]>([]);
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  useEffect(() => {
    if (user) {
      const id = user.email ?? "";
      const getUserCourseList = async () => {
        const courses = await getUserCourses(id);
        setUserCourses(courses);
      };
      getUserCourseList();
    }
  }, [user]);
  return (
    <DefaultLayout>
      <RoomProvider
        id="dashboard"
        initialPresence={{
          cursor: null,
          message: "",
          userId: user?.email ?? "",
        }}
      >
        <LiveCursorWrapper>
          <div className="flex flex-col items-center">
            <CourseWeb userCourses={userCourses} />
          </div>
        </LiveCursorWrapper>
      </RoomProvider>
    </DefaultLayout>
  );
}
