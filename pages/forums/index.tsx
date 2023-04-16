import DefaultLayout from "@/components/defaultLayout";
import ForumCard from "@/components/forum/forumCard";
import { ForumDetails } from "@/interfaces";
import { getUserForums } from "@/lib/firebase";
import { useLocalStorage } from "@/lib/hooks/useUser";
import { User } from "firebase/auth";
import React, { useEffect } from "react";

export default function Forums() {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const [forums, setForums] = React.useState<ForumDetails[]>([] as ForumDetails[]);
  useEffect(() => {
    const getUserSubscribedForums = async (email: string) => {
      const forums = await getUserForums(email);
      setForums(forums);
    };
    if (user && user.email) {
      getUserSubscribedForums(user.email);
    }
  }, [user]);

  return (
    <DefaultLayout>
      <div className="flex flex-col space-y-16 items-center">
        <div className="flex flex-col space-y-4 w-[50%]">
          {
            forums.map((forum, idx) => (
              <ForumCard key={idx} forum={forum} />
            ))
          }
        </div>
      </div>
    </DefaultLayout>
  );
}
