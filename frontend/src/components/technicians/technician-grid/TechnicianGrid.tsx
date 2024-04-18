'use client'

import { getTechnicianById } from "@/actions";
import { Pencil, Trash } from "@/components"
import { FormCreateTechnician } from "@/components";
import { titleFont } from "@/config/fonts";
import { Technician } from "@/interfaces";
import Image from "next/image";
import { useState } from "react"

interface Props {
  technicians: Technician[]
}

export const TechnicianGrid = ({ technicians }: Props) => {
  const [isFormAviable, setIsFormAviable] = useState(false)
  const [technician, setTechnician] = useState<Technician | null>(null)

  const handleFormAviability = () => {
    setIsFormAviable(!isFormAviable)
  }

  const handleClickPencil = async (id: string) => {

    const { technician } = await getTechnicianById(id)

    setTechnician(technician)
  }

  return (
    <div className="flex gap-4">
      {/* section 1 */}
      {/* //TODO componentizar */}
      <div className="p-4 pb-6 border rounded flex flex-col gap-4 border-[#B9B8B8] shadow-lg min-w-[448px] justify-between">

        <div>
          <h1 className={`${titleFont.className} font-bold text-2xl text-black antialiased capitalize`}>técnicos registrados</h1>

          <div className="mt-4 mb-4 flex flex-col gap-4">
            {
              technicians.map((technician, index) => (
                <div key={index} className="flex items-center justify-between gap-8 p-3 rounded bg-secondary">

                  <Image src={technician.avatar ? technician.avatar : '/avatar'} alt="avatar" width={50} height={50} className="rounded-full" />


                  <p className="text-black">{technician.fullName}</p>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleClickPencil(technician.id)} >
                      <Pencil />
                    </button>
                    <button><Trash /></button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {
          !isFormAviable && (
            <button
              onClick={handleFormAviability}
              className="bg-primary hover:opacity-85 text-white py-2 text-center rounded transition-all capitalize h-[51px] w-[174px]">crear técnico</button>
          )
        }
      </div>

      {/* section 2 */}
      <FormCreateTechnician setIsFormAviable={setIsFormAviable} isFormAviable={isFormAviable} technician={technician} />
    </div>
  )
}
