import { SVGProps } from "react";

export const TechniciansTop = (props: SVGProps<SVGSVGElement>) => (
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
      d="M30 18h7.5M30 24h7.5M30 30h7.5M9 39h30a4.5 4.5 0 0 0 4.5-4.5v-21A4.5 4.5 0 0 0 39 9H9a4.5 4.5 0 0 0-4.5 4.5v21A4.5 4.5 0 0 0 9 39Zm12-20.25a3.75 3.75 0 1 1-7.499 0 3.75 3.75 0 0 1 7.499 0Zm2.588 12.672A13.442 13.442 0 0 1 17.248 33a13.44 13.44 0 0 1-6.336-1.578 6.753 6.753 0 0 1 12.676 0Z"
    />
  </svg>
)
