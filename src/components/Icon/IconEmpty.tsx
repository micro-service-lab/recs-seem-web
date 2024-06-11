import type { SVGProps } from "react";

function PhEmptyBold(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="m203.63 62.65l13.25-14.58a12 12 0 0 0-17.76-16.14l-13.24 14.56A100 100 0 0 0 52.37 193.35l-13.25 14.58a12 12 0 1 0 17.76 16.14l13.24-14.56A100 100 0 0 0 203.63 62.65M52 128a75.94 75.94 0 0 1 117.58-63.57l-100.91 111A75.6 75.6 0 0 1 52 128m76 76a75.5 75.5 0 0 1-41.58-12.43l100.91-111A75.94 75.94 0 0 1 128 204"
      ></path>
    </svg>
  );
}

export default PhEmptyBold;