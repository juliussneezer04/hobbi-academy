import DefaultLayout from "@/components/defaultLayout";
import { Course } from "@/interfaces";
import { getCourse } from "@/lib/firebase";
import { GetServerSideProps } from "next";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const course = await getCourse(ctx.query.coursesId as string);
  return {
    props: {
      course,
    }
  };
};

interface CoursePageProps {
  course: Course;
}

export default function Course(props: CoursePageProps) {
  return (
    <DefaultLayout>
      <div>
        <h1 className="text-4xl font-semibold">
          Course {props.course.title}
        </h1>
        <div className="text-2xl font-medium">
          {props.course.description}
        </div>
      </div>
    </DefaultLayout>
  );
}
