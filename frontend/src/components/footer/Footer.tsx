import { Title } from "@/components"
import Image from "next/image"

export const Footer = () => {
  return (
    <footer className="flex flex-col py-24 px-8 md:px-[72px] gap-3 items-center bg-black text-white text-sm md:text-base">
      {/* <Title title="MiTaller online" className="font-black my-2" /> */}
      <Image src={'/logoBlanco.png'} alt="TallerXpert" className="w-auto lg:w-[200px] h-auto lg:h-[35px]" width={200} height={40}/>
      <small>copyright &copy; {new Date().getFullYear()} <b>NoCountry</b> - Seleccionado  14-36</small>

      <small>Información Legal | Política de privacidad</small>

    </footer>
  )
}
