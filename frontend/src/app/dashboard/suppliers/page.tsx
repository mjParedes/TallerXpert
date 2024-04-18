import { Title } from '@/components'
import { SupplierAccordion } from '@/components/supplier-accordion/SupplierAccordion'

export default function SuppliersPage() {
  const suppliers = [
    {
      id: '000-001',
      company: 'Oster',
      seller: 'Esteban Lapiedra',
      phone: '+54 343 4256433',
      email: 'proveedor@email.com'
    },
    {
      id: '000-002',
      company: 'GA.MA',
      seller: 'Lorena Carrigo',
      phone: '+54 343 252463',
      email: 'proveedor@email.com'
    }
  ]

  return (
    <section>
      <div className='flex justify-between items-end mt-2'>
        <button className='bg-primary text-white p-3 rounded leading-none'>Añadir Proveedor</button>
        <div className='relative'>
          <input
            type='text'
            className='rounded border text-black bg-[#fff] pr-6 pl-3 py-1'
            placeholder='Buscar...'
          />
          <svg
            className='absolute top-1/2 right-2 -translate-y-2/4'
            width='17'
            height='16'
            viewBox='0 0 17 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0_259_1000)'>
              <path
                d='M15.9497 14.2969L12.9258 11.1989C15.1884 8.10235 14.5714 3.71368 11.5478 1.39653C8.52413 -0.920614 4.23873 -0.288803 1.9761 2.80771C-0.286522 5.90423 0.330422 10.2929 3.35408 12.61C5.78293 14.4714 9.11891 14.4714 11.5478 12.61L14.573 15.7081C14.9531 16.0974 15.5695 16.0974 15.9496 15.7081C16.3298 15.3188 16.3298 14.6876 15.9496 14.2983L15.9497 14.2969ZM7.47614 12.0121C4.78886 12.0121 2.61041 9.78114 2.61041 7.02911C2.61041 4.27707 4.78886 2.04613 7.47614 2.04613C10.1634 2.04613 12.3419 4.27707 12.3419 7.02911C12.339 9.7799 10.1622 12.0092 7.47614 12.0121Z'
                fill='#6264D5'
              />
            </g>
            <defs>
              <clipPath id='clip0_259_1000'>
                <rect width='15.6235' height='16' fill='white' transform='translate(0.611816)' />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <div className='mt-5'>
        <div className='bg-primary rounded-md flex px-4 py-4 gap-2 shadow-[0_4px_12px_0_rgba(0,0,0,0.25)] mb-5'>
          <div className='text-white font-bold text-sm flex-1'>Id Proveedor</div>
          <div className='text-white font-bold text-sm flex-1'>Empresa</div>
          <div className='text-white font-bold text-sm flex-1'>Vendedor</div>
          <div className='text-white font-bold text-sm flex-1'>Teléfono</div>
          <div className='text-white font-bold text-sm flex-1'>Email</div>
          <span className='flex-1'></span>
        </div>

        {suppliers.map((supplier, index) => (
          <SupplierAccordion key='index' supplier={supplier} />
        ))}
      </div>
    </section>
  )
}
