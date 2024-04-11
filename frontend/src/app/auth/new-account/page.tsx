import { RegistrationForm, Title } from "@/components";
// import Link from "next/link";


export default function NewAccountPage() {
  return (
    <div>
      <Title
        title="Registra tu cuenta"
        className="text-[32px] px-[72px] pt-8 pb-[72px]"
      />
      <div className="flex justify-center">
        <RegistrationForm />
      </div>

      {/* <Link className="bg-blue-500 p-2 rounded" href={"/admin"}>
        Crear cuenta
      </Link> */}
    </div>
  );
}
