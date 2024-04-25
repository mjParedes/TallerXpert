import Image from "next/image"
import Link from "next/link"
import { Menu } from "../icons/Menu"
import { getUserSessionServer, logout } from "@/actions"
import { LoginButton } from "../auth/LoginButton"

export const Navbar = async () => {
  const user = await getUserSessionServer()

  return (
    <nav className="w-full h-20 text-black font-black px-3 md:px-8 mt-8 md:mt-0 bg-transparent ">
      <div className="flex justify-between items-center max-w-[1440px] mx-auto h-full ">
        <div className="flex items-center">
          <Link href={'/'}>
            <Image src={'/logo.png'} alt="" className="w-24 md:w-auto lg:w-[255] h-auto lg:h-[51]" width={255} height={51} />
          </Link>
        </div>
        <div className="visible md:hidden">
          <Menu width={18} />
        </div>
        {
          !user ? (
            <ul className="hidden md:flex gap-4 p-[10px]">
              <li>
                <Link href={'/auth/login'} className="font-bold text-xs md:font-bold md:text-base">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link href={'/auth/new-account'} className="text-white font-bold text-xs md:font-bold md:text-base bg-primary rounded-lg p-4">
                  Registrarse
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="hidden md:flex gap-4 p-[10px]">
              <li>
                <LoginButton />
              </li>
              <li>
                <Link href={'/dashboard'} className="text-white font-bold text-xs md:font-bold md:text-base bg-primary rounded-lg p-4">
                  Dashboard
                </Link>
              </li>
            </ul>
          )
        }
      </div>

    </nav>
  )
}
