'use client'

import { BranchLogo, Company, Dashboard, Orders, Statistics, Suppliers, Technicians } from '@/components'
import Link from 'next/link'

const sideItems = [
  {
    path: '/admin',
    icon: <Dashboard />,
    title: 'Dashboard'
  },
  {
    path: '/admin',
    icon: <Technicians />,
    title: 'Técnicos'
  },
  {
    path: '/admin',
    icon: <Orders />,
    title: 'Ordenes'
  },
  {
    path: '/admin',
    icon: <Suppliers />,
    title: 'Proveedores'
  },
  {
    path: '/admin',
    icon: <Statistics />,
    title: 'Estadisticas'
  },
  {
    path: '/admin',
    icon: <Company />,
    title: 'Taller'
  }
]

export const Sidebar = () => {

  const tallerName = 'Nombre del Taller'


  return (
    <nav
      className='w-[248px] h-screen min-h-[1024px] flex flex-col justify-around bg-tertiary shadow-xl px-6 py-[42px] text-white'
    >

      <div className='flex flex-col items-center gap-3'>
        <div className="rounded-full h-16 w-16 bg-white">
          {/* should be an image */}
        </div>
        <h1 className='font-black text-xl text-center uppercase'>{tallerName}</h1>
      </div>

      {/* menu */}
      <ul className="flex flex-col text-white uppercase gap-6">
        {
          sideItems.map((item, index) => (
            <li key={index}
              className='py-2 hover:bg-quaternary'>
              <Link href={item.path} className='flex items-center py-[4.5px] gap-6 font-bold text-base'>
                <span className='ml-2'>{item.icon}</span>
                {item.title}
              </Link>
            </li>
          ))
        }

      </ul>

      <div className='flex flex-col w-full items-center gap-[27px]'>
        <Link href="/admin">
          <BranchLogo />
        </Link>
        <p className='text-white font-semibold uppercase text-center'>soporte</p>
      </div>
    </nav >
  )
}