'use client'

import { Order, Report, Supplier } from "@/components"
import Link from "next/link";
import { useState } from "react";
import { Modal } from "@/components/ui/modal/Modal";

export const CardsDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8">
        <Link href={'/dashboard/orders'} className={`bg-[#F1CC5B] w-[215px] h-[170px] flex flex-col gap-4 rounded p-4 text-white cursor-pointer`}>

          <div>
            <Order />
          </div>

          <h1 className="text-2xl capitalize">
            nueva orden de trabajo
          </h1>

          <span className="text-right">
            Total: 34567
          </span>
        </Link>

        <div onClick={handleClick} className={`bg-[#8A7CC9] w-[215px] h-[170px] flex flex-col gap-4 rounded p-4 text-white cursor-pointer`}>

          <div>
            <Report />
          </div>

          <h1 className="text-2xl capitalize">
            nuevo informe de trabajo
          </h1>

          <span className="text-right">
            Total: 34567
          </span>
        </div>

        <Link href={'/dashboard/suppliers'} onClick={handleClick} className={`bg-[#EB6196] w-[215px] h-[170px] flex flex-col gap-4 rounded p-4 text-white cursor-pointer`}>

          <div>
            <Supplier />
          </div>

          <h1 className="text-2xl capitalize">
            agregar proveedor
          </h1>

          <span className="text-right">
            Total: 34567
          </span>
        </Link>

        <div onClick={handleClick} className={`bg-[#34A853] w-[215px] h-[170px] flex flex-col gap-4 rounded p-4 text-white cursor-pointer`}>

          <div>
            <Report />
          </div>

          <h1 className="text-2xl capitalize">
            consultar reparación
          </h1>

          <span className="text-right">
            Total: 34567
          </span>
        </div>
      </div>

      <Modal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <h1>Modal</h1>
      </Modal>
    </>
  )
}