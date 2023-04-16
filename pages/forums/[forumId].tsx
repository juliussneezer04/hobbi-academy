import DefaultLayout from "@/components/defaultLayout";
import { ForumDetails } from "@/interfaces";
import { getForumMessages } from "@/lib/firebase";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { forumId } = context.params as { forumId: string };
  const forum = await getForumMessages(forumId);
  return {
    props: {
      forum,
    },
  };
};

export default function Forum(props: {
  forum: ForumDetails;
}) {
  const router = useRouter();
  const { forum } = props;
  return (
    <DefaultLayout>
      <div>
        <h1>Forum {forum.id}</h1>
        {
          forum.messages.map((message) => (
            <div key={message.id}>
              <p>{message.content}</p>
              <p>{message.author}</p>
            </div>
          ))
        }
      </div>
    </DefaultLayout>
  );
}
