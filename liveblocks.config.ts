import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { Event } from "./interfaces";

const client = createClient({
  publicApiKey: process.env.LIVEBLOCKS_PUBLIC_API_KEY || "",
});

type Presence = {
  cursor: { x: number; y: number } | null;
  message: string;
  userId: string;
};

export const {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useBroadcastEvent,
  useMyPresence,
  useEventListener,
} = createRoomContext<Presence, {}, {}, Event>(client);
