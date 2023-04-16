import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { classNames } from "@/lib/utils";

type Props = {
  color: string;
  x: number;
  y: number;
  message?: string;
  picture?: string;
};

export default function Cursor({ color, x, y, message, picture }: Props) {
  return (
    <motion.div
      style={{
        position: "absolute",
        zIndex: 100,
        left: 0,
        top: 0,
      }}
      initial={{ x, y }}
      animate={{ x, y }}
      transition={{
        type: "spring",
        damping: 30,
        mass: 0.8,
        stiffness: 350,
      }}
    >
      <CursorSvg color={color} />
      <div
        className={classNames(
          message ? "px-1.5" : "px-1",
          "absolute top-5 left-2 py-1 rounded-full"
        )}
        style={{ backgroundColor: color }}
      >
        <div className="flex flex-row items-center justify-center leading-relaxed text-white whitespace-nowrap text-sm">
          {picture && (
            <div className="rounded-full w-7 h-7 overflow-hidden">
              <img
                alt="cursor profile picture"
                src={picture}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {message && <p className="mx-1">{message}</p>}
        </div>
      </div>
    </motion.div>
  );
}

// SVG cursor shape
export function CursorSvg({ color } : { color: string }) {
  return (
    <svg width="32" height="44" viewBox="0 0 24 36" fill="none">
      <path
        fill={color}
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
      />
    </svg>
  );
}
