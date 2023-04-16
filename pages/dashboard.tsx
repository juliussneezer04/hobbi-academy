import CourseWeb from "@/components/courseWeb";
import DefaultLayout from "@/components/defaultLayout";
import React, { useEffect } from "react";
import { getUserCourses } from "@/lib/firebase";
import { Course } from "@/interfaces";
import { useLocalStorage } from "@/lib/hooks/useUser";
import { User } from "firebase/auth";
import {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
} from "@/liveblocks.config";
import Cursor from "@/components/cursorComponent";

export default function Dashboard() {
  const [userCourses, setUserCourses] = React.useState<Course[]>([]);
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();
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
        <div
          className="flex flex-col items-center"
          onPointerMove={(e) =>
            updateMyPresence({
              cursor: {
                x: e.clientX,
                y: e.clientY,
              },
            })
          }
          onPointerLeave={() => updateMyPresence({ cursor: null })}
        >
          {others.map(({ connectionId, presence }) =>
            presence.cursor ? (
              <Cursor   
                key={connectionId}
                x={presence.cursor.x}
                y={presence.cursor.y}
                color={""}              
              />
            ) : null
          )}
          <CourseWeb userCourses={userCourses} />
        </div>
      </RoomProvider>
    </DefaultLayout>
  );
}
