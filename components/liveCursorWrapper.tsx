import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useMediaQuery, useInterval } from "usehooks-ts";
import { useBroadcastEvent, useEventListener, useMyPresence } from "@/liveblocks.config";
import {
  CURSOR_COLORS,
  CursorMode,
  CursorState,
  LiveBroadcastEvent,
  Reaction,
  ReactionEvent,
} from "@/interfaces";
import FlyingReaction from "./FlyingReaction";
import ReactionSelector from "./reactionSelector";
import Cursor from "./cursorComponent";
import { useLiveChatEnabled } from "./useLiveChatEnabled";
import { useLiveCursors } from "@/lib/cursors";
import { generateAvatarSvg } from "@/lib/utils";

interface LiveCursorWrapperProps {
  children: React.ReactNode;
}

export default function LiveCursorWrapper(props: LiveCursorWrapperProps) {
  const { children } = props;
  const liveChatEnabled = useLiveChatEnabled();
  const isMobile = useMediaQuery("(max-width: 480px)");
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.ChatHidden,
  });
  const broadcast = useBroadcastEvent();
  const [{ cursor: myCursor, userId }, updateMyPresence] =
    useMyPresence();
  const [reactions, setReactions] = useState<Reaction[]>([]);

  const setReaction = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  }, []);

  // Remove reactions that are not visible anymore (every 1 sec)
  useInterval(() => {
    setReactions((reactions) =>
      reactions.filter((reaction) => reaction.timestamp > Date.now() - 4000)
    );
  }, 1000);

  useInterval(() => {
    if (
      cursorState.mode === CursorMode.Reaction &&
      cursorState.isPressed &&
      myCursor
    ) {
      setReactions((reactions) =>
        reactions.concat([
          {
            point: { x: myCursor.x, y: myCursor.y },
            value: cursorState.reaction,
            timestamp: Date.now(),
          },
        ])
      );
      broadcast({
        type: LiveBroadcastEvent.ReactionEvent,
        data: {
          x: myCursor.x,
          y: myCursor.y,
          value: cursorState.reaction,
        },
      });
    }
  }, 100);

  useEffect(() => {
    if (liveChatEnabled) {
      const onKeyUp = (e: KeyboardEvent) => {
        const target = e.target as Element;
        if (
          e.key === "/" &&
          target.nodeName !== "INPUT" &&
          target.nodeName !== "TEXTAREA"
        ) {
          setCursorState({
            mode: CursorMode.Chat,
            previousMessage: null,
            message: "",
          });
        } else if (e.key === "Escape") {
          updateMyPresence({ message: "" });
          setCursorState({ mode: CursorMode.ChatHidden });
        } else if (e.key === "E" && e.shiftKey) {
          setCursorState({ mode: CursorMode.ReactionSelector });
        }
      }

      const onKeyDown = (e: KeyboardEvent) => {
        const target = e.target as Element;
        if (
          e.key === "/" &&
          target.nodeName !== "INPUT" &&
          target.nodeName !== "TEXTAREA"
        ) {
          e.preventDefault();
        }
      }
      window.addEventListener("keyup", onKeyUp);
      window.addEventListener("keydown", onKeyDown);

      return () => {
        window.removeEventListener("keyup", onKeyUp);
        window.removeEventListener("keydown", onKeyDown);
      };
    } else {
      updateMyPresence({ message: "" });
      setCursorState({ mode: CursorMode.ChatHidden });
    }
  }, [updateMyPresence, liveChatEnabled]);

  useEventListener((eventData) => {
    if (eventData.event.type === LiveBroadcastEvent.ReactionEvent) {
      const event = eventData.event.data as ReactionEvent;
      setReactions((reactions) =>
        reactions.concat([
          {
            point: { x: event.x, y: event.y },
            value: event.value,
            timestamp: Date.now(),
          },
        ])
      );
    }
  });

  const cursors = useLiveCursors(myCursor, cursorState, setCursorState);

  return (
    <>
      <div className="cursor-[url(/cursor.svg),_default]">
        {reactions.map((reaction) => {
          return (
            <FlyingReaction
              key={reaction.timestamp.toString()}
              x={reaction.point.x}
              y={reaction.point.y}
              timestamp={reaction.timestamp}
              value={reaction.value}
            />
          );
        })}

        {myCursor && (
          <div
            className="absolute z-40 top-0 left-0"
            style={{
              transform: `translateX(${
                myCursor.x * window.innerWidth
              }px) translateY(${myCursor.y}px)`,
            }}
          >
            {cursorState.mode === CursorMode.Chat && (
              <>
                <div
                  className="absolute top-5 left-2 px-1.5 py-1 bg-blue-500 text-white leading-relaxed text-sm"
                  onKeyUp={(e) => e.stopPropagation()}
                  style={{
                    borderRadius: 20,
                  }}
                >
                  <div className="flex flex-row items-center justify-center w-fit">
                      <div className="rounded-full w-7 h-7 overflow-hidden">
                        <img
                          alt="cursor profile picture"
                          src={generateAvatarSvg(userId)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    <div>
                      {cursorState.previousMessage && (
                        <div className="mx-1 px-2 pt-1 font-medium whitespace-nowrap">
                          {cursorState.previousMessage}
                        </div>
                      )}
                      <input
                        className="bg-transparent border-none	px-2 py-1 font-medium outline-none text-white placeholder-blue-300 w-60 ml-1"
                        autoFocus={true}
                        onChange={(e) => {
                          const message = e.target.value as string;
                          updateMyPresence({ message });
                          setCursorState({
                            mode: CursorMode.Chat,
                            previousMessage: null,
                            message: e.target.value,
                          });
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setCursorState({
                              mode: CursorMode.Chat,
                              previousMessage: cursorState.message,
                              message: "",
                            });
                          } else if (e.key === "Escape") {
                            updateMyPresence({ message: "" });
                            setCursorState({
                              mode: CursorMode.ChatHidden,
                            });
                          }
                        }}
                        placeholder={
                          cursorState.previousMessage ? "" : "Say something…"
                        }
                        value={cursorState.message}
                        maxLength={50}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {cursorState.mode === CursorMode.ReactionSelector && (
              <ReactionSelector
                setReaction={(reaction) => {
                  setReaction(reaction);
                }}
              />
            )}
            {cursorState.mode === CursorMode.Reaction && (
              <div className="absolute top-3.5 left-1 pointer-events-none select-none">
                {cursorState.reaction}
              </div>
            )}
          </div>
        )}
        {isMobile
          ? null
          : cursors.map(({ x, y, message, picture, connectionId }) => {
              return (
                <Cursor
                  key={connectionId}
                  color={CURSOR_COLORS[connectionId % CURSOR_COLORS.length]}
                  x={x}
                  y={y}
                  message={message}
                  picture={picture}
                />
              );
            })}
        {children}
      </div>
    </>
  );
}
