'use client'

import { useState } from 'react'

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  supplier: {
    id: string
    company: string
    seller: string
    address: string
    city: string
    description: string
    phone: string
    email: string
    cuit: string
  }
}

export const SupplierAccordion = ({ supplier }: Props) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <>
      <div
        onClick={() => setCollapsed(!collapsed)}
        className={`rounded-md flex px-4 py-4 gap-2 shadow-[0_4px_12px_0_rgba(0,0,0,0.25)] mb-6 cursor-pointer hover:bg-[#CACCFF] transition-all
          ${collapsed ? 'bg-secondary' : 'bg-[#CACCFF]'}
          `}
      >
        <div className='text-black text-sm flex-1'>{supplier.id}</div>
        <div className='text-black text-sm flex-1'>{supplier.company}</div>
        <div className='text-black text-sm flex-1'>{supplier.seller}</div>
        <div className='text-black text-sm flex-1'>{supplier.phone}</div>
        <div className='text-black text-sm flex-1'>{supplier.email}</div>
        <span className='flex-1'></span>
      </div>
      <div
        className={`accordion-body grid grid-cols-2 px-5 py-6 mb-4 shadow-[0_4px_12px_0_rgba(0,0,0,0.25)] rounded-md ${
          collapsed ? 'hidden overflow-hidden' : ''
        }`}
      >
        <div className=''>
          <p className='mb-4'>
            <strong>Empresa:</strong> {supplier.company}
          </p>
          <p className='mb-4'>
            <strong>Dirección:</strong> {supplier.address}
          </p>
          <p className='mb-4'>
            <strong>Ciudad:</strong> {supplier.city}
          </p>
          <p className='mb-4'>
            <strong>E-mail:</strong> {supplier.email}
          </p>
          <p>
            <strong>Descripción:</strong> {supplier.description}
          </p>
        </div>
        <div className=''>
          <p className='mb-4'>
            <strong>Vendedor:</strong> {supplier.seller}
          </p>
          <p className='mb-4'>
            <strong>Teléfono:</strong> {supplier.phone}
          </p>
          <p className='mb-4'>
            <strong>CUIT:</strong> {supplier.cuit}
          </p>
        </div>
      </div>
    </>
  )
}
