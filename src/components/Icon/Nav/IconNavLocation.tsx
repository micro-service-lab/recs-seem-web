import type { SVGProps } from "react";

function ZondiconsLocation(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="currentColor"
        d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13m0-11a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
      ></path>
    </svg>
  );
}

export default ZondiconsLocation;
