import Link from 'next/link';

export default function ReparateId({
  params,
}: {
  params: {id: string; idReparate: string};
}) {
  return (
    <div>
      <div className='flex flex-col gap-12'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-bold  text-2xl flex gap-2 items-center'>
              <img src='/dataReparation.svg' alt='dataReparation' />
              Datos de Reparación
              <span className='text-xl font-normal'>
                (ID:{params.idReparate})
              </span>
            </h2>
            <p>Fecha de ingreso - DD/MM/AAA</p>
          </div>
          <div className='relative flex flex-col gap-6 pt-12 pb-12 text-white p-4 border-[1px] rounded-lg border-[#B9B8B8] shadow-[0px_4px_4px_0px_#00000040] bg-gradient-to-b from-[#4F3E9C] to-[#6162D3]  '>
            <p className='flex gap-4 items-center'>
              Artículo: <span className='ml-1'>NOMBRE DEL ARTÍCULO </span>
            </p>
            <p className='flex gap-4 items-center'>
              Marca: <span className='ml-1'>NOMBRE DE LA MARCA</span>
            </p>
            <p className='flex gap-4 items-center'>
              Modelo: <span className='ml-1'>NOMBRE DE MODELO</span>
            </p>
            <p className='flex gap-4 items-center'>
              N° de Serie: <span className='ml-1'>NUMERO DE SERIE</span>
            </p>{' '}
            <p className='flex gap-4 items-center'>
              Datos de Garantía:{' '}
              <span className='ml-1'>FECHA + NUMERO FACTURA</span>
            </p>{' '}
            <p className='flex gap-4 items-center'>
              Daño Reportado:{' '}
              <span className='ml-1'>DESCRIPCION DEL DAÑO REPORTADO</span>
            </p>{' '}
            <p className='flex gap-4 items-center'>
              Notas: <span className='ml-1'>DESCRIPCION NOTAS ADICIONALES</span>
            </p>
            <img
              src='/orderReparation.svg'
              alt='orderReparation'
              className='absolute top-[5%] right-[2%] max-lg:hidden'
            />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className='font-bold text-2xl'>Diagnóstico</h2>
          <div className='flex gap-24 max-xl:gap-8 min-md:justify-between max-xl:flex-col'>
            <div className='flex flex-col gap-4 max-lg:w-full'>
              <div className='p-4 w-[510px] h-[140px] max-xl:w-full border-[1px] border-[#B9B8B8]'>
                Aún no se registra un diagnóstico
              </div>
              <div>
                <input
                  type='radio'
                  name='reparate'
                  id='reparate'
                  defaultChecked
                />
                <label htmlFor='reparate' className='ml-2'>
                  Reparado
                </label>
                <input
                  type='radio'
                  name='wait'
                  id='wait'
                  defaultChecked={false}
                  className='ml-4'
                />
                <label htmlFor='wait' className='ml-2'>
                  En Espera
                </label>
              </div>
              <p className='flex gap-4 items-center'>
                Técnico Asignado{' '}
                <span className='ml-1'>NOMBRE DEL TÉCNICO </span>
              </p>
            </div>
            <div>
              <div className='p-4 border-[1px] border-[#B9B8B8] shadow-[0px_4px_4px_0px_#00000040] flex flex-col gap-4'>
                <div className='flex text-lg font-normal justify-between'>
                  <p className='w-full flex justify-between mr-2'>
                    Costo de Revisión <span className='ml-2'>$</span>
                  </p>
                  <input
                    type='number'
                    value={'0.00'}
                    className='bg-[#F4F4F4] rounded-md border-[1px] border-[#B9B8B8] w-[200px]'
                    disabled
                  />
                </div>
                <div className='flex text-xl font-medium justify-between'>
                  <p className='w-full flex justify-between mr-2'>
                    Costo de Reparación <span className='ml-2'>$</span>
                  </p>
                  <input
                    type='number'
                    value={'0.00'}
                    className='bg-[#F4F4F4] rounded-md border-[1px] border-[#B9B8B8] w-[200px]'
                    disabled
                  />
                </div>
                <div className='flex text-2xl font-semibold justify-between'>
                  <p className='w-full  flex justify-between mr-2'>
                    Costo Total <span className='ml-2 '>$</span>
                  </p>
                  <input
                    type='number'
                    value={'0.00'}
                    className='bg-[#F4F4F4] rounded-md border-[1px] border-[#B9B8B8] w-[200px]'
                    disabled
                  />
                </div>
                <div className='flex justify-end'>
                  <button className='mt-4 p-2 pl-6 pr-6 bg-[#EB6196] text-white hover:opacity-70 rounded-md'>
                    Finalizar Reparación
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex max-lg:justify-center gap-4'>
          <Link
            href={'/dashboard/orders'}
            className='bg-primary text-white p-8 pt-2 pb-2 rounded-lg hover:opacity-70'>
            Editar
          </Link>
          <Link
            href={'/dashboard/orders/' + params.id}
            className='bg-primary text-white p-8 pt-2 pb-2 rounded-lg hover:opacity-70'>
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
