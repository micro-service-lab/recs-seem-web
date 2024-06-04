import type { SVGProps } from "react";

function IconParkSolidPermissions(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={4}
      >
        <path
          strokeLinejoin="round"
          d="M20 10H6a2 2 0 0 0-2 2v26a2 2 0 0 0 2 2h36a2 2 0 0 0 2-2v-2.5"
        ></path>
        <path d="M10 23h8m-8 8h24"></path>
        <circle
          cx={34}
          cy={16}
          r={6}
          fill="currentColor"
          strokeLinejoin="round"
        ></circle>
        <path
          strokeLinejoin="round"
          d="M44 28.419C42.047 24.602 38 22 34 22s-5.993 1.133-8.05 3"
        ></path>
      </g>
    </svg>
  );
}

export default IconParkSolidPermissions;
