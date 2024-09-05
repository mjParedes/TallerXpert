import Image from 'next/image'
import React from 'react'

interface Props {
  service: {
    title: string
    description: string
  }
}

export const CardService = ({ service }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center border rounded-lg relative pt-16 mt-16'>

      <div className="w-32 h-32 bg-gray-400 rounded-full absolute -top-16">
        {/* should be a image */}
      </div>

      <h2 className='text-2xl font-semibold pt-2 px-2 text-center'>{service.title}</h2>
      <p className='p-4'>{service.description}</p>
    </div>
  )
}
