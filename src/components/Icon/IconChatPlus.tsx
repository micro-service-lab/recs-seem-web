import type { SVGProps } from "react";

function MynauiChatPlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.5 12h5M12 9.5v5m0 6.5a9 9 0 1 0-9-9c0 1.44.338 2.8.94 4.007c.453.911-.177 2.14-.417 3.037a1.17 1.17 0 0 0 1.433 1.433c.897-.24 2.126-.87 3.037-.416A8.964 8.964 0 0 0 12 21"
      ></path>
    </svg>
  );
}

export default MynauiChatPlus;