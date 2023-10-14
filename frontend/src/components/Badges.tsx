/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";
import ProgressBar from "./Progress";
import clsx from "clsx";
import useGameStore from "../../utils/store";
import Tile from "./Tile";
import Image from "next/image";
import Confetti from "./Confetti";

interface IBadges {
  className?: string;
}

export default function Badges({ className }: IBadges) {
  const [total, setTotal] = useState(3);
  const [play, setPlay] = useState(false);
  const { badges } = useGameStore();
  const [tiles, setTiles] = useState<any>();
  const collectedStampCount = useMemo(
    () => badges.reduce((acc, badge) => acc + (badge.collected ? 1 : 0), 0),
    [badges]
  );
  const percentageCollected = useMemo(
    () => Math.floor((collectedStampCount / total) * 100),
    [collectedStampCount, total]
  );

  useEffect(() => {
    setTotal(badges.length);
  }, [badges]);

  useEffect(() => {
    if (total > 0 && total - collectedStampCount === 0) {
      setPlay(true);
      setTimeout(() => {
        setPlay(false);
      }, 7000);
    }
  }, [total, collectedStampCount]);

  useEffect(() => {
    setTiles(badges);

    const unsub = useGameStore.subscribe(
      (state) => state.badges,
      (badges) => {
        console.log("Badges updated");
        setTiles(badges);
      },
      {
        fireImmediately: true,
      }
    );

    return () => unsub();
  }, []);

  return (
    tiles &&
    tiles.length > 0 && (
      <div
        className={clsx(
          `flex flex-col h-full items-center justify-center gap-y-8 my-8`,
          className
        )}
      >
        <div className="flex flex-row items-center justify-center w-full my-4 md:my-8">
          <div className="grid list-none m-0 p-0 grid-cols-hexagon">
            <Tile
              className="col-start-5 row-start-1 col-span-3 row-span-5"
              tile={tiles[0]}
            />
            <Tile
              className="col-start-1 row-start-[11] col-span-3 row-span-5"
              tile={tiles[1]}
            />
            <Tile
              className="col-start-[9] row-start-[11] col-span-3 row-span-5"
              tile={tiles[2]}
            />
            <Image
              className="relative col-start-5 row-start-[7] col-span-3 row-span-5 mt-2 lg:mt-8"
              src="/logo.png"
              alt="Poison Fire Logo"
              width={180}
              height={180}
              priority
            />
          </div>
        </div>
        <div className="w-full max-w-md text-center gap-y-3 flex flex-col">
          <p className="font-bold">
            {collectedStampCount} / {total} collected
          </p>
          <ProgressBar percentage={percentageCollected} />
          <p className="font-light">
            {total - collectedStampCount > 0
              ? `${total - collectedStampCount} more to go!`
              : `All treasure found! 🎉`}
          </p>
        </div>

        <Confetti play={play} />
      </div>
    )
  );
}
