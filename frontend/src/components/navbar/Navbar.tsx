import Image from "next/image"
import Link from "next/link"

export const Navbar = () => {
  return (
    <nav className="w-full px-[10px] h-20 bg-primary text-primary font-black">
      <div className="flex justify-between items-center max-w-[1440px] mx-auto h-full">
        <div className="flex items-center">
          <Link className="text-xl lg:text-[32px] " href={'/'}>
            <Image src={'/logo.png'} alt="" className="w-24 md:w-auto lg:w-[255] h-auto lg:h-[51]" width={255} height={51} />
          </Link>
        </div>
        <ul className="flex gap-4 p-[10px] h-[39px]">
          <li>
            <Link href={'/auth/new-account'} className="font-bold text-xs md:font-black md:text-base">
              Registrarse
            </Link>
          </li>
          <li>
            <Link href={'/auth/login'} className="font-bold text-xs md:font-black md:text-base">
              Iniciar Sesión
            </Link>
          </li>
        </ul>
      </div>

    </nav>
  )
}
