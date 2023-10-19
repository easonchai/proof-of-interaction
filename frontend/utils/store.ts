import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
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
    id: "043B19DA811390",
    name: "Taiko",
    imageUrl: "/assets/taiko-tile.png",
    hint: "A higher power than square, the treasure guardian does bear.",
    tokenId: undefined,
    collected: false,
    position: undefined,
    minted: false,
  },
  {
    id: "044D1ADA811390",
    name: "Mantle",
    imageUrl: "/assets/mantle-tile.png",
    hint: "Find the treasure's next pass, where feet in nature touch the grass.",
    tokenId: undefined,
    collected: false,
    position: undefined,
    minted: false,
  },
];

const useGameStore = create<GameState>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          badges: [...defaultBadges],
          history: {},
          collect: (badge) =>
            set((state) => {
              const found = state.badges.findIndex((b) => b.id === badge.id);
              const array = [...state.badges];
              if (found !== -1) {
                const temp = {
                  ...state.badges[found],
                  collected: true,
                  tokenId: badge.tokenId,
                  position: badge.position,
                };
                array[found] = temp;
              }
              return { badges: array };
            }),
          mint: (badge) =>
            set((state) => {
              const found = state.badges.findIndex(
                (b) => b.tokenId === badge.tokenId
              );
              if (found !== -1) {
                state.badges[found].minted = true;
              }
              return { badges: [...state.badges] };
            }),
          reset: () =>
            set({
              badges: [...defaultBadges],
              history: {},
            }),
          trackHistory: (data: string) => {
            set((state) => {
              state.history[data] = true;
              return {
                history: {
                  ...state.history,
                },
              };
            });
          },
        }),
        {
          name: "poi-storage",
        }
      )
    )
  )
);

export default useGameStore;
