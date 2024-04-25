import { SVGProps } from "react";

export const Workshop = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18 28.5v-10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10m-6 0H3.147M18 28.5h6m0 0h4.853M27 28.5V12.965m0 0a4 4 0 0 1-5-.818 3.994 3.994 0 0 1-3 1.353 3.991 3.991 0 0 1-3-1.355 3.99 3.99 0 0 1-3 1.355 3.991 3.991 0 0 1-3-1.355 4.002 4.002 0 0 1-5 .82m22 0a4 4 0 0 0 .828-6.293L26.24 5.087a2 2 0 0 0-1.413-.587H7.17a2 2 0 0 0-1.414.585L4.172 6.672A4.005 4.005 0 0 0 5 12.965M5 28.5V12.965M9 24.5h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"
    />
  </svg>
)

