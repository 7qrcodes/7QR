import { cn } from "@dub/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="191"
      height="191"
      viewBox="0 0 191 191"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-10 text-black", className)}
    >
      <circle cx="95.5" cy="95.5" r="95.5" fill="#08272E" />
      <path
        d="M102.528 148.556H69.1637C72.6528 125.627 83.8286 104.832 102.691 86.1713H55.2621V67.8451H136.055V83.0333C115.121 104.121 103.945 125.962 102.528 148.556Z"
        fill="#BCE7FD"
      />
      <path
        d="M55.1778 42.4445H135.94V57.9729H55.1778V42.4445Z"
        fill="#FF934F"
      />
    </svg>
  );
}
