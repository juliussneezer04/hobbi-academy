import DefaultLayout from "@/components/defaultLayout";
import { useRouter } from "next/router";
import React from "react";

export default function Forum() {
  const router = useRouter();
  const { forumId } = router.query;
  return (
    <DefaultLayout>
      <div>
        <h1>Forum {forumId}</h1>
      </div>
    </DefaultLayout>
  );
}
