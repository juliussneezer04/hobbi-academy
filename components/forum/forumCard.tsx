import React from "react";
import { ForumDetails } from "@/interfaces";

export default function ForumCard(props: { forum: ForumDetails }) {
  const { forum } = props;

  return (
    <a href={`/forums/${forum.id}`} className="hover:underline">
      <div className="bg-white px-4 py-5 sm:px- shadow-md rounded-md opacity-100">
        <div className="text-sm flex flex-col space-y-4">
          <div className="flex space-x-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {forum.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
