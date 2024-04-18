import { Sidebar, TopMenu } from "@/components";
import SessionAuthProvider from "@/context/SessionAuthProvider";

export default function RootAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionAuthProvider>
      <main className="flex">
        <Sidebar />
        <div className="w-full">
          <TopMenu />
          <div className="p-8 pl-[17px]">
            {children}
          </div>
        </div>
      </main>

    </SessionAuthProvider>

  );
}
