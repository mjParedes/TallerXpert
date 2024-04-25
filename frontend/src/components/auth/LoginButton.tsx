'use client'
import { logout } from "@/actions"

export const LoginButton = () => {
  return (
    <button onClick={async () => await logout()} className="font-bold text-xs md:font-bold md:text-base">
      Cerrar sesión
    </button>
  )
}
