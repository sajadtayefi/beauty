import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function ToothIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5c-1.8-1.2-4.4-1.4-6 .1-1.5 1.4-1.6 3.6-1 5.5.6 1.8 1 3.4 1.2 5.4.2 1.8.4 5.5 2.3 5.5 1.6 0 1.7-2.6 2-4.2.2-1.2.5-2.3 1.5-2.3s1.3 1.1 1.5 2.3c.3 1.6.4 4.2 2 4.2 1.9 0 2.1-3.7 2.3-5.5.2-2 .6-3.6 1.2-5.4.6-1.9.5-4.1-1-5.5-1.6-1.5-4.2-1.3-6-.1Z" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9 12 3.5Z" />
      <path d="M19 3.5v3M17.5 5h3" />
    </svg>
  );
}

export function ImplantIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8.5 4.5h7L14 9h-4L8.5 4.5Z" />
      <path d="M12 9v11" />
      <path d="M9.5 11.5h5M9.8 14.5h4.4M10.4 17.5h3.2" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 19 6v5.5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-2.5Z" />
      <path d="m9.2 11.8 2 2 3.6-3.8" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 12a8 8 0 1 0-15 3.8L4 20l4.4-1.2A8 8 0 0 0 20 12Z" />
      <path d="M9 10.5h6M9 13.5h3.5" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2.5" />
      <path d="M4 10h16M8.5 3.5v3.5M15.5 3.5v3.5" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* points left by default = "forward" in RTL */}
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7-4.3-8.6-9A4.6 4.6 0 0 1 12 7.4 4.6 4.6 0 0 1 20.6 11c-1.6 4.7-8.6 9-8.6 9Z" />
    </svg>
  );
}
