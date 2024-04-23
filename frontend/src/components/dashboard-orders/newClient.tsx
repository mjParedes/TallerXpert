'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

export const NewClient = () => {
  const [formDataClient, setFormDataClient] = useState({
    fullName: '',
    dni: '',
    address: '',
    city: '',
    phone: '',
    email: ''
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormDataClient(prevClient => ({ ...prevClient, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Cliente creado')
  }

  return (
    <div className='bg-white rounded-lg flex flex-col  px-4 py-6'>
      <div>
        <p className='font-bold'>Datos de Cliente</p>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-7 px-4 py-6'>
        <div className='flex flex-row justify-between items-center gap-8'>
          <label htmlFor='fullName'>Nombre y Apellido</label>
          <input
            type='text'
            id='fullName'
            name='fullName'
            value={formDataClient.fullName}
            onChange={handleChange}
            placeholder='Nombre y Apellido'
            className='h-8 w-72 rounded bg-secondary pl-3'
          />
        </div>
        <div className='flex flex-row justify-between items-center gap-8'>
          <label htmlFor='dni'>DNI</label>
          <input
            type='text'
            id='dni'
            name='dni'
            value={formDataClient.dni}
            onChange={handleChange}
            placeholder='DNI'
            className='h-8 w-72 rounded bg-secondary pl-3'
          />
        </div>
        <div className='flex flex-row justify-between items-center gap-8'>
          <label htmlFor='address'>Dirección</label>
          <input
            type='text'
            id='address'
            name='address'
            value={formDataClient.address}
            onChange={handleChange}
            placeholder='Dirección'
            className='h-8 w-72 rounded bg-secondary pl-3'
          />
        </div>
        <div className='flex flex-row justify-between items-center gap-8'>
          <label htmlFor='city'>Ciudad</label>
          <input
            type='text'
            id='city'
            name='city'
            value={formDataClient.city}
            onChange={handleChange}
            placeholder='Ciudad'
            className='h-8 w-72 rounded bg-secondary pl-3'
          />
        </div>
        <div className='flex flex-row justify-between items-center gap-8'>
          <label htmlFor='phone'>Telefono</label>
          <input
            type='number'
            id='phone'
            name='phone'
            value={formDataClient.fullName}
            onChange={handleChange}
            placeholder='Numero de telefono'
            className='h-8 w-72 rounded bg-secondary pl-3'
          />
        </div>
        <div className='flex flex-row justify-between items-center gap-8'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formDataClient.fullName}
            onChange={handleChange}
            placeholder='Email'
            className='h-8 w-72 rounded bg-secondary pl-3'
          />
        </div>
      </form>
    </div>
  )
}
