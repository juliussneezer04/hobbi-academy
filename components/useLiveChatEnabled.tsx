import React, { useState, createContext, useContext, Context } from "react";

type Store = {
  liveChatEnabled: boolean;
  toggleLiveChatEnabled: () => void;
};

const useStore = () => {
  const [liveChatEnabled, setLiveChatEnabled] = useState(true);

  return {
    liveChatEnabled,
    toggleLiveChatEnabled: () => setLiveChatEnabled(!liveChatEnabled),
  };
};

const LiveChatContext = createContext<Store | null>(null);

export const LiveChatContextProvider = ({ children }: { children: React.ReactNode}) => (
  <LiveChatContext.Provider value={useStore()}>
    {children}
  </LiveChatContext.Provider>
);

export const useLiveChatEnabled = () =>
  useContext(LiveChatContext as Context<any>).liveChatEnabled;
export const useToggleLiveChatEnabled = () =>
  useContext(LiveChatContext as Context<any>).toggleLiveChatEnabled;
