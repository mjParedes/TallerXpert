'use client'

import { usePathname } from 'next/navigation'
import { DashboardDark, SuppliersDark, Title, TechniciansDark, OrdersDark } from '@/components'
import { getDateFormatSpanish } from '@/utils'
import Image from 'next/image'

export const TopMenu = () => {
  const pathName = usePathname()
  const currentDate = new Date()
  const formatDate = getDateFormatSpanish(currentDate)

  const routeConfig = {
    '/dashboard': {
      icon: <DashboardDark />,
      title: 'Dashboard'
    },
    '/dashboard/technicians': {
      icon: <TechniciansDark />,
      title: 'Técnicos'
    },
    '/dashboard/orders': {
      icon: <OrdersDark />,
      title: 'Ordenes'
    },
    '/dashboard/suppliers': {
      icon: <SuppliersDark />,
      title: 'Proveedores'
    },
    '/dashboard/statistics': {
      icon: <DashboardDark />,
      title: 'Estadísticas'
    },
    '/dashboard/workshop': {
      icon: <DashboardDark />,
      title: 'Taller'
    }
  }

  const currentRouteConfig = routeConfig[pathName as keyof typeof routeConfig] || {};

  const { icon, title } = currentRouteConfig

  const userName = 'User'
  const userImage = 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'

  return (
    <nav className="flex p-[32px] justify-between items-center w-full">

      {/* left menu */}
      <div className='flex justify-center items-center gap-2'>
        {icon}
        <Title title={title} className='text-[32px]' />
      </div>

      {/* center menu */}
      <h2 className='m-2 p-2'>{formatDate}</h2>

      {/* right menu */}
      <div className='flex items-center justify-center gap-2 py-2'>
        <Image src={userImage} alt={userName} className="w-12 h-12 m-auto rounded-full object-cover" width={150} height={150} />
        <h2 className="text-base font-semibold text-gray-900">{userName}</h2>

        <button type='button'>
          <svg width="20" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,70 20,30 80,30" fill="black" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
