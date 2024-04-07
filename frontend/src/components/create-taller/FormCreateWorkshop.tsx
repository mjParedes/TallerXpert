'use client'

import { createWorkshop } from "@/actions/workshop/create-workshop";
import { sleep } from "@/utils";
import clsx from "clsx";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { useForm } from 'react-hook-form'

interface WorkshopForm {
  name: string;
  direction: string;
  city: string;
  phone: string;
  email: string;
  cuit: string;
  specializedField: string;
  logoImage?: File;
}

const specializedFields = [
  {
    id: 1,
    name: 'Mecánica'
  },
  {
    id: 2,
    name: 'Electricidad'
  },
  {
    id: 3,
    name: 'Carpintería'
  },
  {
    id: 4,
    name: 'Plomería'
  },
  {
    id: 5,
    name: 'Jardinería'
  }
]

export const FormCreateWorkshop = () => {
  const [image, setImage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            const result = reader.result
            setImage(result)
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const router = useRouter()

  const { handleSubmit, register, formState: { isValid }, formState: { errors } } = useForm<WorkshopForm>({
    defaultValues: {}
  })

  const onSubmit = async (data: WorkshopForm) => {
    setErrorMessage('')
    setIsSubmitting(true)

    const formData = {
      ...data,
      logoImage: image
    }

    // server action
    const rta = await createWorkshop(formData)
    setIsSubmitting(false)

    if (!rta.ok) {
      setErrorMessage('No se pudo crear taller')
      return
    }

    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 pl-20">

      <div className="flex flex-col w-full pl-8 pr-[53px] py-4 gap-4 ">

        <span className='text-red-500 pb-3'>{errorMessage}</span>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-white">Nombre institucional</label>
          <input
            className={
              clsx(
                'h-10 p-2 rounded-lg border border-solid focus:outline-none',
                {
                  'border-red-500': errors.name
                }
              )
            }
            type="text"
            {...register('name', { required: true })}
          />
          {
            errors.name?.type === 'required' && (
              <span className='text-red-500'>* El nombre es requerido</span>
            )
          }
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="direction" className="text-white">Dirección fiscal</label>
          <input
            className={
              clsx(
                'h-10 p-2 rounded-lg border border-solid focus:outline-none',
                {
                  'border-red-500': errors.name
                }
              )
            }
            type="text"
            {...register('direction', { required: true })}
          />
          {
            errors.direction?.type === 'required' && (
              <span className='text-red-500'>* La dirección es requerida</span>
            )
          }
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="city" className="text-white">Ciudad</label>
          <input
            className={
              clsx(
                'h-10 p-2 rounded-lg border border-solid focus:outline-none',
                {
                  'border-red-500': errors.name
                }
              )
            } type="text"
            {...register('city', { required: true })}
          />
          {
            errors.city?.type === 'required' && (
              <span className='text-red-500'>* La ciudad es requerida</span>
            )
          }
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-white">Teléfono de contacto</label>
          <input
            className={
              clsx(
                'h-10 p-2 rounded-lg border border-solid focus:outline-none',
                {
                  'border-red-500': errors.name
                }
              )
            }
            type="text"
            {...register('phone', { required: true })}
          />
          {
            errors.phone?.type === 'required' && (
              <span className='text-red-500'>* El teléfono es requerido</span>
            )
          }
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white">Email</label>
          <input
            className={
              clsx(
                'h-10 p-2 rounded-lg border border-solid focus:outline-none',
                {
                  'border-red-500': errors.name
                }
              )
            }
            type="email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i, minLength: 6 })}
          />
          {
            errors.email?.type === 'required' && (
              <span className='text-red-500'>* El correo es requerido</span>
            )
          }
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cuit" className="text-white">Número de CUIT</label>
          <input
            className={
              clsx(
                'h-10 p-2 rounded-lg border border-solid focus:outline-none',
                {
                  'border-red-500': errors.name
                }
              )
            } type="text"
            {...register('cuit', { required: true })}
          />
          {
            errors.cuit?.type === 'required' && (
              <span className='text-red-500'>* El número CUIT</span>
            )
          }
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="specializedField" className="text-white">Rubro especializado</label>
          <div className="mt-1 relative">
            <select
              className={
                clsx(
                  'h-10 p-2 rounded-lg border border-solid focus:outline-none appearance-none w-full',
                  {
                    'border-red-500': errors.name
                  }
                )
              }
              {...register('specializedField', { required: true })}
            >
              <option value=""></option>
              {
                specializedFields.map((field) => (
                  <option key={field.id} value={field.name}>{field.name}</option>
                ))
              }
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700 bg-primary h-10 p-2 rounded-br-lg rounded-tr-lg border border-tertiary">

              <svg width="20" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,85 85,15 15,15" fill="white" />
              </svg>
            </div>
          </div>
          {
            errors.specializedField?.type === 'required' && (
              <span className='text-red-500'>* EL campo especializado es requerido</span>
            )
          }
        </div>

        <div className="mt-[73px] mb-10">
          <button
            disabled={isSubmitting}
            type="submit"
            className={clsx(
              {
                'btn-primary': !isValid || !isSubmitting,
                'btn-disable': isSubmitting
              }
            )}
          >
            {isSubmitting ? 'Creando...' : 'Crear taller'}
          </button>
        </div>

      </div>

      <div className="flex flex-col gap-4">
        <div className="w-64 h-64 relative  bg-primary">
          {
            image && (
              <Image src={image} alt="Vista previa" width={300} height={300} className="object-cover w-full h-full" />
            )
          }
        </div>

        {
          !image && (
            <p className="text-white">Ninguna imagen añadida...</p>
          )
        }

        <label className="block w-64 focus:outline-none btn-primary">
          Cargar Logo
          <input
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
        </label>

      </div>

    </form>
  )
}
