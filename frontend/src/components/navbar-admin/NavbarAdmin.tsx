import Link from "next/link"

export const NavbarAdmin = () => {
  return (
    <nav className="w-full px-[10px] py-[32px] bg-primary text-primary font-black">
      <div className="flex justify-between items-center max-w-[1440px] mx-auto">
        <div className="flex items-center">
          <Link className="text-[32px]" href={'/'}>MiTaller online</Link>
        </div>
        <ul className="flex gap-2">
          <li>
            <Link href={'/'}>
              Provedores
            </Link>
          </li>
          <li>
            <Link href={'/'}>
              Historial
            </Link>
          </li>
        </ul>
      </div>

    </nav>
  )
}
