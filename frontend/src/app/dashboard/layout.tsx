import { Sidebar, TopMenu } from "@/components";

export default function RootAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="w-full">
        <TopMenu />
        <div className="p-[32px]">
          {children}
        </div>
      </div>
    </main>

  );
}
