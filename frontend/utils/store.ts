import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

export interface Badge {
  id: string;
  name: string;
  imageUrl: string;
  tokenId?: string;
  collected: boolean;
}

interface GameState {
  badges: Badge[];
  collect: (badge: { id: string; tokenId: string }) => void;
  reset: () => void;
}

const defaultBadges: Badge[] = [
  {
    id: "04441ADA811390",
    name: "ETHKL Nasi Lemak",
    imageUrl: "/assets/eth-tile.png",
    tokenId: undefined,
    collected: false,
  },
  {
    id: "2",
    name: "Taiko",
    imageUrl: "/assets/mantle-tile.png",
    tokenId: undefined,
    collected: false,
  },
  {
    id: "3",
    name: "Mantle",
    imageUrl: "/assets/taiko-tile.png",
    tokenId: undefined,
    collected: false,
  },
];

const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set) => ({
        badges: [...defaultBadges],
        collect: (badge) =>
          set((state) => {
            const found = state.badges.findIndex((b) => b.id === badge.id);
            if (found !== -1) {
              state.badges[found].collected = true;
            }
            return { badges: state.badges };
          }),
        reset: () =>
          set({
            badges: [...defaultBadges],
          }),
      }),
      {
        name: "poi-storage",
      }
    )
  )
);

export default useGameStore;
