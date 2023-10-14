import React from "react";
import * as Progress from "@radix-ui/react-progress";
import clsx from "clsx";

interface IProgressBar {
  percentage: number;
  max?: number;
  className?: string;
}

const ProgressBar = ({ percentage, max = 100, className }: IProgressBar) => {
  return (
    <Progress.Root
      className={clsx(
        "relative overflow-hidden w-full h-3 rounded-full bg-slate-300",
        className
      )}
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={percentage > max ? max : percentage}
      max={max}
    >
      <Progress.Indicator
        className="bg-success w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)] rounded-full"
        style={{
          transform: `translateX(-${
            100 - (Math.min(percentage, max) / max) * 100
          }%)`,
        }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
