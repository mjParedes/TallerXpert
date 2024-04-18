import SessionAuthProvider from "@/context/SessionAuthProvider";

export default function RootAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-full items-center justify-center">
      <SessionAuthProvider>{children}</SessionAuthProvider>
    </main>
  );
}
