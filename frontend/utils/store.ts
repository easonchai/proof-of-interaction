import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

export interface Badge {
  id: string;
  name: string;
  imageUrl: string;
  tokenId?: string;
  position?: number;
  hint: string;
  minted: boolean;
  collected: boolean;
}

interface GameState {
  badges: Badge[];
  history: {
    [key: string]: boolean;
  };
  collect: (badge: { id: string; tokenId: string; position: number }) => void;
  mint: (badge: { tokenId: string }) => void;
  reset: () => void;
  trackHistory: (data: string) => void;
}

const defaultBadges: Badge[] = [
  {
    id: "04441ADA811390",
    name: "ETHKL Nasi Lemak",
    imageUrl: "/assets/eth-tile.png",
    hint: "Within the fiery venom's fold, the treasure guardian does hold.",
    tokenId: undefined,
    collected: false,
    position: undefined,
    minted: false,
  },
  {
    id: "2",
    name: "Taiko",
    imageUrl: "/assets/taiko-tile.png",
    hint: "Where woven woods and cryptos meet, your prize lies subtly neat.",
    tokenId: undefined,
    collected: false,
    position: undefined,
    minted: false,
  },
  {
    id: "3",
    name: "Mantle",
    imageUrl: "/assets/mantle-tile.png",
    hint: "Past the symbols of esteem, lies the treasure of your dream.",
    tokenId: undefined,
    collected: false,
    position: undefined,
    minted: false,
  },
];

const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set) => ({
        badges: [...defaultBadges],
        history: {},
        collect: (badge) =>
          set((state) => {
            const found = state.badges.findIndex((b) => b.id === badge.id);
            if (found !== -1) {
              state.badges[found].collected = true;
              state.badges[found].tokenId = badge.tokenId;
              state.badges[found].position = badge.position;
            }
            return { badges: state.badges };
          }),
        mint: (badge) =>
          set((state) => {
            const found = state.badges.findIndex(
              (b) => b.tokenId === badge.tokenId
            );
            if (found !== -1) {
              state.badges[found].minted = true;
            }
            return { badges: state.badges };
          }),
        reset: () =>
          set({
            badges: [...defaultBadges],
          }),
        trackHistory: (data: string) => {
          set((state) => {
            state.history[data] = true;
            return { history: state.history };
          });
        },
      }),
      {
        name: "poi-storage",
      }
    )
  )
);

export default useGameStore;
