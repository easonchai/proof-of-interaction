/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import clsx from "clsx";
import useGameStore, { Badge } from "../../utils/store";

interface ITile {
  tile: Badge;
  className?: string;
}

export default function Tile({ tile, className }: ITile) {
  const found = useMemo(() => {
    return tile.collected;
  }, [tile]);
  const type = useMemo(() => {
    if (found) return "Info";
    return "Hint";
  }, [found]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className={clsx(
        "relative w-full md:max-w-[192px] flex items-center justify-center active:scale-90 transition-transform",
        className
      )}
      onClick={() => setIsOpen(true)}
    >
      <Image
        src={found ? tile.imageUrl : "/assets/locked-tile.svg"}
        alt=""
        width={384}
        height={384}
        layout="responsive"
        className={clsx(found ? "drop-shadow-claimed" : "")}
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
    </button>
  );
}
