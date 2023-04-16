import { addForumMessage } from "@/lib/firebase";
import { useLocalStorage } from "@/lib/hooks/useUser";
import { User } from "firebase/auth";
import React from "react";

export default function ForumMessageBox(props: { forumId: string }) {
  const [message, setMessage] = React.useState<string>("");
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  return (
    <div className="bg-white py-5 px-4 shadow-md fixed bottom-4 space-x-2 rounded-md flex flex-row w-[50%] items-center">
      <input
        type="text"
        className="w-full rounded-md"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button
        className="bg-blue-500 text-white rounded-md px-4 py-2"
        onClick={() => {
          user &&
            addForumMessage(props.forumId, {
              author: user.email ?? "Anonymous",
              content: message,
            });
          setMessage("");
        }}
      >
        Send
      </button>
    </div>
  );
}
