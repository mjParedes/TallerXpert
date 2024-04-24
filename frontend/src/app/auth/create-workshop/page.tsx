import { FormCreateWorkshop, Title } from "@/components"
import Image from "next/image"

const CreateTallerPage = () => {
  return (
    <div className="w-full relative bg-white">

      <div className="flex bg-white lg:bg-transparent p-5 lg:p-0 lg:absolute right-[10px] lg:right-[72px] top-[32px]">
        <div className="w-[300px] h-[40px]">
          <Image src="/logo.png" alt="maintenance" width={400} height={400} />
        </div>

      </div>

      <div className="flex flex-col lg:w-4/6 h-full bg-secondary min-h-svh">
        <div className="flex w-full">
          <Title
            title="Vamos a ingresar los datos de tu taller." className="text-2xl p-8 lg:text-[32px] lg:px-[72px] lg:pt-8 lg:pb-[72px]"
          />
        </div>

        <FormCreateWorkshop />

      </div>

      <div className="hidden lg:block w-[500px] h-[500px] absolute right-[72px] bottom-[50px]">
        <Image src="/maintenance-bro.png" alt="maintenance" width={500} height={500} />
      </div>

    </div>
  )
}

export default CreateTallerPage