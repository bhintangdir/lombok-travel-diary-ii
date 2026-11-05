import React from "react";

interface WhatsAppIconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export default function WhatsAppIcon({ className = "", size = 20, style }: WhatsAppIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`wa-icon ${className}`}
      data-icon="whatsapp"
      style={{
        fill: "currentColor",
        stroke: "none",
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        ...style,
      }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        stroke="none"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.04 3.67C16.58 3.67 20.28 7.37 20.28 11.91C20.28 16.45 16.58 20.15 12.04 20.15ZM16.56 14.36C16.31 14.23 15.09 13.63 14.86 13.55C14.64 13.47 14.47 13.43 14.3 13.68C14.13 13.93 13.65 14.49 13.5 14.65C13.36 14.82 13.21 14.84 12.96 14.71C12.71 14.59 11.91 14.32 10.96 13.47C10.22 12.81 9.72 11.99 9.57 11.74C9.43 11.49 9.56 11.36 9.68 11.23C9.79 11.12 9.93 10.94 10.05 10.8C10.18 10.65 10.22 10.55 10.3 10.38C10.39 10.22 10.35 10.07 10.28 9.95C10.22 9.82 9.72 8.6 9.51 8.1C9.31 7.61 9.1 7.68 8.95 7.67C8.81 7.66 8.64 7.66 8.47 7.66C8.3 7.66 8.03 7.72 7.8 7.97C7.57 8.22 6.93 8.82 6.93 10.04C6.93 11.26 7.82 12.44 7.95 12.61C8.07 12.77 9.71 15.3 12.21 16.38C12.8 16.64 13.27 16.79 13.63 16.91C14.23 17.1 14.77 17.07 15.2 17.01C15.68 16.94 16.68 16.41 16.89 15.82C17.1 15.24 17.1 14.74 17.04 14.64C16.97 14.54 16.81 14.48 16.56 14.36Z"
      />
    </svg>
  );
}
