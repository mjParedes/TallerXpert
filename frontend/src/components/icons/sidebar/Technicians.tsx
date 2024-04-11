import { SVGProps } from "react";

export const Technicians = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 12.5h5m-5 4h5m-5 4h5m-19 6h20a3 3 0 0 0 3-3v-14a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3ZM14 13a2.5 2.5 0 1 1-5.001 0A2.5 2.5 0 0 1 14 13Zm1.725 8.448A8.961 8.961 0 0 1 11.5 22.5a8.962 8.962 0 0 1-4.224-1.052 4.501 4.501 0 0 1 8.45 0Z"
    />
  </svg>
)
