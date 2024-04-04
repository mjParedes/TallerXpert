import { Title } from "@/components"

export const Footer = () => {
  return (
    <footer className="flex flex-col py-10 px-[72px] gap-3 items-center bg-primary text-primary">
      <Title title="MiTaller online" className="font-black my-2" />

      <small>copyright &copy; {new Date().getFullYear()} <b>NoCountry</b> - Seleccionado  14-36</small>

      <small>Información Legal | Política de privacidad</small>

    </footer>
  )
}
