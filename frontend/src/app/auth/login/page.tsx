import Link from "next/link";
import { LoginForm, Title } from "@/components";

export default function LoginPage() {
  return (
    <div>
      <Title
        title="Inicia sesión"
        className="text-[32px] px-[72px] pt-8 pb-[72px]"
      />
      <LoginForm />

      {/* <Link className="bg-blue-500 p-2 rounded" href={"/admin"}>
        Iniciar sesión
      </Link> */}
    </div>
  );
}
