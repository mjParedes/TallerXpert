import Link from 'next/link';
import {LoginForm, Title} from '@/components';

export default function LoginPage() {
  return (
    <div className='max-md:w-[90%] flex gap-8 items-center  w-full justify-center h-[100vh]'>
      <img
        src='/login.svg'
        className='max-xl:hidden max-w-[600px] min-w-[500px]'></img>
      <div className='max-md:w-full'>
        {' '}
        <h2 className='text-[32px] px-[72px] pt-8 pb-8 text-center font-black text-[#6264D5]'>
          Inicia sesión
        </h2>
        <LoginForm />
      </div>
      {/* <Link className="bg-blue-500 p-2 rounded" href={"/admin"}>
        Iniciar sesión
      </Link> */}
    </div>
  );
}
