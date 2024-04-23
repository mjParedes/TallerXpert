'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormImputs {
  company: string
  address: string
  phone: string
  city: string
  cuit: string
  email: string
  seller: string
  description: string
}

interface Supplier {
  id: string
  company: string
  address: string
  phone: string
  city: string
  cuit: string
  email: string
  seller: string
  description: string
}

interface Props {
  supplier: Supplier | null
  isEditSupplier: boolean
}

export const SupplierForm = ({ isEditSupplier, supplier }: Props) => {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
    formState: { errors }
  } = useForm<FormImputs>({
    defaultValues: {
      company: supplier?.company || '',
      address: supplier?.address || '',
      phone: supplier?.phone || '',
      city: supplier?.city || '',
      cuit: supplier?.cuit || '',
      email: supplier?.email || '',
      seller: supplier?.seller || ''
    }
  })

  const onSubmit = async (data: FormImputs) => {
    setErrorMessage('')

    console.log('submitting')

    reset({
      company: '',
      address: '',
      phone: '',
      city: '',
      cuit: '',
      email: '',
      seller: '',
      description: ''
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col items-center border rounded bg-[#FFFFFF] border-[#B9B8B8] shadow-lg w-full p-6 gap-8 mb-5'>
        <div className='flex flex-col w-full gap-4'>
          <div className='flex flex-col p-[10px] gap-[10px]'>
            <div className='flex flex-col'>
              <div className='grid grid-cols-[200px,1fr] items-center'>
                <label htmlFor='fullName'>Empresa</label>
                {isEditSupplier === false && supplier ? (
                  <div className='py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2 flex items-center text-primary'>
                    <p>{supplier?.company}</p>
                  </div>
                ) : (
                  <input
                    className={clsx(
                      'py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2',
                      {
                        'border-red-500': errors.company
                      }
                    )}
                    type='text'
                    {...register('company', { required: true })}
                  />
                )}
              </div>
              {errors.company?.type === 'required' && (
                <span className='text-red-500'>* El nombre completo del usuario es requerido</span>
              )}
            </div>
          </div>

          <div className='flex flex-col p-[10px] gap-[10px]'>
            <div className='flex flex-col'>
              <div className='grid grid-cols-[200px,1fr] items-center'>
                <label htmlFor='fullName'>Dirección</label>
                {isEditSupplier === false && supplier ? (
                  <div className='py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2 flex items-center text-primary'>
                    <p>{supplier?.address}</p>
                  </div>
                ) : (
                  <input
                    className={clsx(
                      'py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2',
                      {
                        'border-red-500': errors.address
                      }
                    )}
                    type='text'
                    {...register('address', { required: true })}
                  />
                )}
              </div>
              {errors.address?.type === 'required' && (
                <span className='text-red-500'>* El nombre completo del usuario es requerido</span>
              )}
            </div>
          </div>

          <div className='flex flex-col p-[10px] gap-[10px]'>
            <div className='flex flex-col'>
              <div className='grid grid-cols-[200px,1fr] items-center'>
                <label htmlFor='fullName'>Teléfono</label>
                {isEditSupplier === false && supplier ? (
                  <div className='py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2 flex items-center text-primary'>
                    <p>{supplier?.phone}</p>
                  </div>
                ) : (
                  <input
                    className={clsx(
                      'py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2',
                      {
                        'border-red-500': errors.phone
                      }
                    )}
                    type='text'
                    {...register('phone', { required: true })}
                  />
                )}
              </div>
              {errors.phone?.type === 'required' && (
                <span className='text-red-500'>* El nombre completo del usuario es requerido</span>
              )}
            </div>
          </div>

          <div className='flex flex-col p-[10px] gap-[10px]'>
            <div className='flex flex-col'>
              <div className='grid grid-cols-[200px,1fr] items-center'>
                <label htmlFor='fullName'>Ciudad</label>
                {isEditSupplier === false && supplier ? (
                  <div className='py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2 flex items-center text-primary'>
                    <p>{supplier?.city}</p>
                  </div>
                ) : (
                  <input
                    className={clsx(
                      'py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2',
                      {
                        'border-red-500': errors.city
                      }
                    )}
                    type='text'
                    {...register('city', { required: true })}
                  />
                )}
              </div>
              {errors.city?.type === 'required' && (
                <span className='text-red-500'>* El nombre completo del usuario es requerido</span>
              )}
            </div>
          </div>

          <div className='flex flex-col p-[10px] gap-[10px]'>
            <div className='flex flex-col'>
              <div className='grid grid-cols-[200px,1fr] items-center'>
                <label htmlFor='fullName'>CUIT</label>
                {isEditSupplier === false && supplier ? (
                  <div className='py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2 flex items-center text-primary'>
                    <p>{supplier?.cuit}</p>
                  </div>
                ) : (
                  <input
                    className={clsx(
                      'py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2',
                      {
                        'border-red-500': errors.cuit
                      }
                    )}
                    type='text'
                    {...register('cuit', { required: true })}
                  />
                )}
              </div>
              {errors.cuit?.type === 'required' && (
                <span className='text-red-500'>* El nombre completo del usuario es requerido</span>
              )}
            </div>
          </div>

          <div className='flex flex-col p-[10px] gap-[10px]'>
            <div className='flex flex-col'>
              <div className='grid grid-cols-[200px,1fr] items-center'>
                <label htmlFor='fullName'>E-mail</label>
                {isEditSupplier === false && supplier ? (
                  <div className='py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2 flex items-center text-primary'>
                    <p>{supplier?.email}</p>
                  </div>
                ) : (
                  <input
                    className={clsx(
                      'py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2',
                      {
                        'border-red-500': errors.email
                      }
                    )}
                    type='text'
                    {...register('email', { required: true })}
                  />
                )}
              </div>
              {errors.email?.type === 'required' && (
                <span className='text-red-500'>* El nombre completo del usuario es requerido</span>
              )}
            </div>
          </div>

          <div className='flex flex-col p-[10px] gap-[10px]'>
            <div className='flex flex-col'>
              <div className='grid grid-cols-[200px,1fr] items-center'>
                <label htmlFor='fullName'>Vendedor</label>
                {isEditSupplier === false && supplier ? (
                  <div className='py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2 flex items-center text-primary'>
                    <p>{supplier?.seller}</p>
                  </div>
                ) : (
                  <input
                    className={clsx(
                      'py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2',
                      {
                        'border-red-500': errors.seller
                      }
                    )}
                    type='text'
                    {...register('seller', { required: true })}
                  />
                )}
              </div>
              {errors.seller?.type === 'required' && (
                <span className='text-red-500'>* El nombre completo del usuario es requerido</span>
              )}
            </div>
          </div>

          <div className='flex flex-col p-[10px] gap-[10px]'>
            <div className='flex flex-col'>
              <div className='grid items-center'>
                <label htmlFor='fullName' className='mb-4'>
                  Descripción
                </label>
                {isEditSupplier === false && supplier ? (
                  <div className='py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2 flex items-center text-primary'>
                    <p>{supplier?.description}</p>
                  </div>
                ) : (
                  <input
                    className={clsx(
                      'py-2 rounded-lg border border-solid focus:outline-none bg-white pl-2',
                      {
                        'border-red-500': errors.description
                      }
                    )}
                    type='text'
                    {...register('description', { required: true })}
                  />
                )}
              </div>
              {errors.description?.type === 'required' && (
                <span className='text-red-500'>* El nombre completo del usuario es requerido</span>
              )}
            </div>
          </div>

          <span className='text-red-500'>{errorMessage}</span>
        </div>
      </div>

      <div className='mb-3 flex gap-2'>
        <button type='submit' className='text-white px-6 py-3 rounded bg-primary'>
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </button>
        <button
          onClick={router.back}
          type='button'
          className='text-white px-6 py-3 rounded bg-[#4F3E9C]'
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
