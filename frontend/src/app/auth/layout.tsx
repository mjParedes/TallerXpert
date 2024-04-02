import { NavbarAdmin } from "@/components";
import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-full h-screen p-28 items-center justify-center">
      {children}
    </main>

  );
}
