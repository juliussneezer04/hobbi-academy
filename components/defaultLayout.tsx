import React from "react";
import Drawer from "./drawer";

/**
 * This is the default layout for all pages.
 * Contains a drawer on the left of all pages
 */
export default function DefaultLayout({ children }: { children: React.ReactNode}) {
  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="flex">
        <Drawer />
      </div>
      <div className="flex flex-col h-full w-full">{children}</div>
    </div>
  );
}
