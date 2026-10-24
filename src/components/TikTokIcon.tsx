import React from "react";

interface TikTokIconProps {
  className?: string;
  size?: number;
}

export default function TikTokIcon({ className = "w-4 h-4", size = 16 }: TikTokIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.34 0 .66.06.96.17V9.32a6.38 6.38 0 0 0-.96-.07A6.34 6.34 0 0 0 3 15.59a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.47a8.27 8.27 0 0 0 4.91 1.62V6.69z" />
    </svg>
  );
}
