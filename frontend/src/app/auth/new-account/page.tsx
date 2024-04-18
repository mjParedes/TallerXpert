import {RegistrationForm, Title} from '@/components';
// import Link from "next/link";

export default function NewAccountPage() {
  return (
    <div className='max-md:w-[90%] flex gap-8 items-center  w-full justify-center h-[100vh]'>
      <img
        src='/new-account.svg'
        className='max-xl:hidden max-w-[600px] min-w-[500px]'></img>
      <div>
        <h2 className='text-[32px] px-[72px] pb-8 text-center font-black text-[#6264D5]'>
          Registra tu cuenta
        </h2>
        <div className='flex justify-center'>
          <RegistrationForm />
        </div>
      </div>

      {/* <Link className="bg-blue-500 p-2 rounded" href={"/admin"}>
        Crear cuenta
      </Link> */}
    </div>
  );
}
