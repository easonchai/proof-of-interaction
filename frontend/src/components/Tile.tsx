/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import clsx from "clsx";
import useGameStore from "../../utils/store";

interface IEntity {
  id: string;
  name: string;
  position: number;
  hint?: string;
  metadata?: any;
}

interface ITile {
  tile: IEntity;
  className?: string;
}

export default function Tile({ tile, className }: ITile) {
  const { badges } = useGameStore();
  const found = useMemo(() => {
    return !!badges.find((badge) => badge.id === tile.id)?.collected;
  }, [badges, tile]);
  const type = useMemo(() => {
    if (found) return "Info";
    return "Hint";
  }, [found]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(
        "relative w-full md:max-w-[192px] flex items-center justify-center",
        className
      )}
      onClick={() => setIsOpen(true)}
    >
      <div className="absolute w-full h-full aspect-square flex items-center justify-center">
        {found ? (
          <Image
            src={tile.metadata ? tile.metadata.imageUrl : "/location-1.png"}
            alt=""
            fill
          />
        ) : (
          <Image
            src="/assets/lock.svg"
            alt=""
            width={28}
            height={32}
            className="max-w-[50%]"
          />
        )}
      </div>
      <Image
        src="/assets/locked-tile.svg"
        alt=""
        width={384}
        height={384}
        layout="responsive"
      />
      {/* {type === "Hint" ? (
        <HintModal
          name={tile.name}
          hint={tile.hint || "No hint available for this checkpoint"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ) : (
        <InfoModal
          name={tile.name}
          metadata={tile.metadata}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )} */}
    </div>
  );
}
