import DefaultLayout from "@/components/defaultLayout";
import ForumMessageComponent from "@/components/forum/forumMessage";
import ForumMessageBox from "@/components/forum/forumMessageBox";
import { ForumDetails, ForumMessage } from "@/interfaces";
import { getForumMessages, subscribeToForum } from "@/lib/firebase";
import { DocumentData, QuerySnapshot, doc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

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
  const { forumId } = router.query as { forumId: string };
  const [forum, setForum] = React.useState<ForumDetails>(props.forum);
  useEffect(() => {
    const unsub = subscribeToForum(forumId, (forumSnapshot: QuerySnapshot<DocumentData>) => {
      const forumData = forumSnapshot.docs.filter(doc => doc.exists()).map((doc) => doc.data()) as ForumMessage[];
      setForum({
        id: forumId,
        title: forum.title,
        messages: forumData,
      });
    });

    return unsub;
  }, [forum.title, forumId]);
  return (
    <DefaultLayout>
      <div className="flex flex-col space-y-16 items-center">
        <div className="flex flex-col space-y-4 w-[50%]">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {forum.title}
          </h1>
          {
            forum.messages.map((message, idx) => (
            <ForumMessageComponent key={idx} message={message} /> 
            ))
          }
        </div>
        <ForumMessageBox forumId={forumId} />
      </div>
    </DefaultLayout>
  );
}
