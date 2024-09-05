import { FormCreateWorkshop, Title } from "@/components"
import Image from "next/image"

const CreateTallerPage = () => {
  return (
    <div className="w-full relative bg-white">
      <div className="flex flex-col w-3/4 h-full bg-tertiary min-h-svh">
        <Title
          title="Vamos a ingresar los datos de tu taller." className="text-[32px] px-[72px] pt-8 pb-[72px] text-white"
        />

        <FormCreateWorkshop />

      </div>

      <div className="w-[500px] h-[500px] absolute right-[72px] bottom-[50px]">
        <Image src="/maintenance-bro.png" alt="maintenance" width={500} height={500} />
      </div>

    </div>
  )
}

export default CreateTallerPage