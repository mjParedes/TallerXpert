import Link from "next/link"

export const Navbar = () => {
  return (
    <nav className="w-full px-[10px] py-[32px] bg-primary text-primary font-black">
      <div className="flex justify-between items-center max-w-[1440px] mx-auto">
        <div className="flex items-center">
          <Link className="text-[32px]" href={'/'}>MiTaller online</Link>
        </div>
        <ul className="flex gap-4 p-[10px] h-[39px]">
          <li>
            <Link href={'/auth/new-account'}>
              Registrarse
            </Link>
          </li>
          <li>
            <Link href={'/auth/login'}>
              Iniciar Sesión
            </Link>
          </li>
        </ul>
      </div>

    </nav>
  )
}
