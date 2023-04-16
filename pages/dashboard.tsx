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
import { COURSE_CATEGORY_TO_COLOR, CourseCategory } from "@/constants";
import { generateEdgesFromNodes, getRandomArbitrary } from "@/lib/utils";
import { Node } from "reactflow";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
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
  const router = useRouter();
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

  const courseNodes: Node[] = props.allCourses.map((course, idx) => {
    const userColor = !!(userCourses.find(c => course.forumId === c.forumId))
    ? COURSE_CATEGORY_TO_COLOR[course.category as CourseCategory]
    : "#808080";
    return {
      id: course.forumId,
      type: "input",
      data: {
        label: <button onClick={() => router.push(`/courses/course${course.forumId.slice(-1)}`)}>{course.title}</button>,
      },
      style: {
        color: "white",
        backgroundColor: userColor,
      },
      position: {
        x: idx * 50 + 200,
        y: idx * 50 + 200,
      },
      draggable: true,
    }});

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
              <CourseWeb courseNodes={courseNodes}/>
            </div>
          </LiveCursorWrapper>
        </LiveChatContextProvider>
      </RoomProvider>
    </DefaultLayout>
  );
}
