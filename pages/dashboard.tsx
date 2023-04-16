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

const IDX_TO_POSITION: {
  [key: number]: { x: number; y: number };
} = {
  0: { x: 250, y: 200 },
  1: { x: 300, y: 250 },
  2: { x: 300, y: 300 },
  3: { x: 550, y: 550 },
  4: { x: 550, y: 650 },
  5: { x: 750, y: 600 },
  6: { x: 900, y: 200 },
  7: { x: 850, y: 250 },
  8: { x: 1100, y: 250 },
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
    const isUserCourse = !!(userCourses.find(c => course.forumId === c.forumId));
    const userColor = isUserCourse
    ? COURSE_CATEGORY_TO_COLOR[course.category as CourseCategory]
    : "#808080";
    return {
      id: course.forumId,
      type: "input",
      data: {
        label: isUserCourse ? <button className="animate-pulse" onClick={() => router.push(`/courses/course${course.forumId.slice(-1)}`)}>{course.title}</button> : course.title,
      },
      style: {
        color: "white",
        backgroundColor: userColor,
      },
      position: IDX_TO_POSITION[idx],
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
