import CourseWeb from "@/components/courseWeb";
import DefaultLayout from "@/components/defaultLayout";
import React, { useEffect } from "react";
import { getAllCourses, getUserCourses } from "@/lib/firebase";
import { Course } from "@/interfaces";
import { useLocalStorage } from "@/lib/hooks/useUser";
import { User } from "firebase/auth";
import { RoomProvider } from "@/liveblocks.config";
import LiveCursorWrapper from "@/components/liveCursorWrapper";
import { LiveChatContextProvider } from "@/components/useLiveChatEnabled";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const allCourses = await getAllCourses();
  return {
    props: {
      allCourses,
    },
  };
};


export default function Dashboard(props: { allCourses: Course[] }) {
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
        <LiveChatContextProvider>
          <LiveCursorWrapper>
            <div className="flex flex-col items-center">
              <CourseWeb userCourses={userCourses} allCourses={props.allCourses} />
            </div>
          </LiveCursorWrapper>
        </LiveChatContextProvider>
      </RoomProvider>
    </DefaultLayout>
  );
}
