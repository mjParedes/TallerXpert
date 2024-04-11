import { SVGProps } from "react";

export const StatisticsTop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <path
      stroke="#B9B8B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 18a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 10 18v9a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 4 27v-9Zm9-6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 19 12v15a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 13 27V12Zm9-6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 28 6v21a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 22 27V6Z"
    />
  </svg>
)
