import { CursorMode, CursorState, cursor } from "@/interfaces";
import { useOthers, useUpdateMyPresence } from "@/liveblocks.config";
import { SetStateAction, useEffect } from "react";
import { generateAvatarSvg } from "./utils";

export function useLiveCursors(cursor: { x: number; y: number; } | null, state: CursorState, setState: { (value: SetStateAction<CursorState>): void; (arg0: { (state: any): any; (state: any): any; mode?: CursorMode; }): void; }) {
  const updateMyPresence = useUpdateMyPresence();

  useEffect(() => {
    const scroll = {
      x: window.scrollX,
      y: window.scrollY,
    };

    let lastPosition: { x: number; y: number } | null = null;

    function transformPosition(cursor: cursor) {
      return {
        x: cursor && cursor.x / window.innerWidth,
        y: cursor && cursor.y,
      };
    }

    function onPointerMove(event: PointerEvent) {
      const position = {
        x: event.pageX,
        y: event.pageY,
      };
      lastPosition = position;
      if (cursor == null || state.mode !== CursorMode.ReactionSelector) {
        const transformedCursor = transformPosition(position);
        updateMyPresence({
          cursor: transformedCursor.x === null || transformedCursor.y === null ? null : transformedCursor as { x: number; y: number; },
        });
      }
    }

    function onPointerDown() {
      setState((state: { mode: CursorMode; }) =>
        state.mode === CursorMode.Reaction
          ? { ...state, isPressed: true }
          : state
      );
    }

    function onPointerUp() {
      setState((state: { mode: CursorMode; }) =>
        state.mode === CursorMode.Reaction
          ? { ...state, isPressed: false }
          : state
      );
    }

    function onPointerLeave() {
      lastPosition = null;
      setState({
        mode: CursorMode.ChatHidden,
      });
      updateMyPresence({ cursor: null });
    }

    function onDocumentScroll() {
      if (lastPosition) {
        const offsetX = window.scrollX - scroll.x;
        const offsetY = window.scrollY - scroll.y;
        const position = {
          x: lastPosition.x + offsetX,
          y: lastPosition.y + offsetY,
        };
        lastPosition = position;
        const transformedCursor = transformPosition(position);
        updateMyPresence({
          cursor: transformedCursor.x === null || transformedCursor.y === null ? null : transformedCursor as { x: number; y: number; },
        });
      }
      scroll.x = window.scrollX;
      scroll.y = window.scrollY;
    }

    document.addEventListener("scroll", onDocumentScroll);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);

    return () => {
      document.removeEventListener("scroll", onDocumentScroll);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, [updateMyPresence]);

  const others = useOthers();

  const cursors = [];

  for (const { connectionId, presence } of others) {
    if (presence.cursor) {
      cursors.push({
        x: presence.cursor.x * window.innerWidth,
        y: presence.cursor.y,
        message: presence.message,
        picture:
          generateAvatarSvg(presence.userId),
        connectionId,
      });
    }
  }

  return cursors;
}
