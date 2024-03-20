import { cn } from "@dub/utils";

export default function Logo({ className }: { className?: string }) {
  const blueColor = "#BCE7FD";
  const orangeColor = "#FF934F";
  const baseColor = "#08272E";

  return (
    <svg
      width="191"
      height="191"
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-10 text-black", className)}
    >
      <path
        d="M0 180C0 80.5887 80.5887 0 180 0V0C279.411 0 360 80.5887 360 180V180V180C360 279.411 279.411 360 180 360V360C80.5887 360 0 279.411 0 180V180Z"
        fill={baseColor}
        shapeRendering="geometricPrecision"
      />
      <path
        d="M193.246 280H130.361C136.937 236.784 158.002 197.589 193.554 162.417H104.159V127.876H256.439V156.502C216.982 196.249 195.917 237.415 193.246 280Z"
        fill={blueColor}
        shapeRendering="geometricPrecision"
      />
      <path
        d="M104 80H256.223V109.268H104V80Z"
        fill={orangeColor}
        shapeRendering="geometricPrecision"
      />
    </svg>
  );
}
