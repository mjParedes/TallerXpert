import { SVGProps } from "react";

export const OrdersDark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18 24h7.5M18 30h7.5M18 36h7.5m6 1.5H36a4.5 4.5 0 0 0 4.5-4.5V12.216c0-2.27-1.69-4.196-3.952-4.384a96.807 96.807 0 0 0-2.246-.16m0 0A4.5 4.5 0 0 1 34.5 9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 22.5 9c0-.462.07-.908.2-1.328m11.602 0A4.503 4.503 0 0 0 30 4.5h-3a4.502 4.502 0 0 0-4.3 3.172m0 0c-.752.046-1.5.1-2.248.16-2.262.188-3.952 2.114-3.952 4.384V16.5m0 0H9.75a2.25 2.25 0 0 0-2.25 2.25v22.5a2.25 2.25 0 0 0 2.25 2.25h19.5a2.25 2.25 0 0 0 2.25-2.25v-22.5a2.25 2.25 0 0 0-2.25-2.25H16.5Zm-3 7.5h.016v.016H13.5V24Zm0 6h.016v.016H13.5V30Zm0 6h.016v.016H13.5V36Z"
    />
  </svg>
)
