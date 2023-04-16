import DefaultLayout from "@/components/defaultLayout";
import { Course } from "@/interfaces";
import { getCourse } from "@/lib/firebase";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const course = await getCourse(ctx.query.coursesId as string);
  return {
    props: {
      course,
    },
  };
};

interface CoursePageProps {
  course: Course;
}

export default function Course(props: CoursePageProps) {
  return (
    <DefaultLayout>
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-semibold">{props.course.title}</h1>
        <div className="text-xl font-normal">{props.course.description}</div>
        <div>
          {props.course.courseVideoName.startsWith("https") && (
            <ReactPlayer
              controls
              width="100%"
              url={`${props.course.courseVideoName}`}
            />
          )}
        </div>
        <button className="text-sm p-4 rounded-md w-[20%] font-normal hover:underline bg-blue-600 text-white">
            <Link href={`/forums/${props.course.forumId}.mp4`}>
              Go to the private forum 📰
            </Link>
        </button>
      </div>
    </DefaultLayout>
  );
}
