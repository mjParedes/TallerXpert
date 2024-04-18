import Link from 'next/link';

function TemplateOrdersArticles({
  name,
  mark,
  model,
  warranty,
  state,
  id,
  idReparate,
}: {
  name: string;
  mark: string;
  model: string;
  warranty: string;
  state: string;
  id: string;
  idReparate: string;
}) {
  return (
    <div className='flex justify-between bg-[#DBDCF7] rounded-lg p-4 shadow-[0px_4px_4px_0px_#00000040] max-lg:flex-col max-lg:items-center max-lg:justify-center'>
      <p>{name}</p>
      <p>{mark}</p>
      <p>{model}</p>
      <p>{warranty}</p>
      <p>{state}</p>
      <Link
        href={'/dashboard/orders/' + id + '/' + idReparate}
        className='hover:opacity-70'>
        <img src='/llaveOrders.svg' alt='llaveOrders' />
      </Link>
    </div>
  );
}

const example = [
  {
    id: '1564655',
    name: 'Nombre del Artículo',
    mark: 'Marca',
    model: 'Modelo',
    warranty: 'Garantía',
    state: 'Estado Reparación',
  },
  {
    id: '342543',
    name: 'Nombre del Artículo',
    mark: 'Marca',
    model: 'Modelo',
    warranty: 'Garantía',
    state: 'Estado Reparación',
  },
  {
    id: '65476',
    name: 'Nombre del Artículo',
    mark: 'Marca',
    model: 'Modelo',
    warranty: 'Garantía',
    state: 'Estado Reparación',
  },
  {
    id: '978979',
    name: 'Nombre del Artículo',
    mark: 'Marca',
    model: 'Modelo',
    warranty: 'Garantía',
    state: 'Estado Reparación',
  },
];
export default function OrderId({params}: {params: {id: string}}) {
  return (
    <div className='flex flex-col gap-12'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h2 className='font-bold  text-2xl flex gap-2 items-center'>
            <img src='/user.svg' alt='users' />
            Nombre del Cliente{' '}
            <span className='text-xl font-normal'>(ID:{params.id})</span>
          </h2>
          <p>Fecha de ingreso - DD/MM/AAA</p>
        </div>
        <div className='relative flex flex-col gap-6 pt-12 pb-12 text-white p-4 border-[1px] rounded-lg border-[#B9B8B8] shadow-[0px_4px_4px_0px_#00000040] bg-gradient-to-b from-[#4F3E9C] to-[#6162D3]  '>
          <p className='flex gap-4 items-center'>
            <img src='/direction.svg' alt='direction' />
            Dirección + Ciudad
          </p>
          <p className='flex gap-4 items-center'>
            <img src='/phone.svg' alt='phone' />
            Número de Teléfono
          </p>
          <p className='flex gap-4 items-center'>
            <img src='/email.svg' alt='email' />
            E-mail
          </p>
          <img
            src='/human.svg'
            alt='human'
            className='absolute bottom-0 right-0 max-lg:hidden'
          />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h2 className='font-bold'>Artículos</h2>
        <div className='flex flex-col gap-4 max-lg:flex-row max-lg:flex-wrap'>
          {example.map((item) => (
            <TemplateOrdersArticles
              name={item.name}
              mark={item.mark}
              model={item.model}
              warranty={item.warranty}
              state={item.state}
              id={params.id}
              key={item.id}
              idReparate={item.id}
            />
          ))}
        </div>
      </div>
      <div className='max-lg:flex max-lg:justify-center'>
        <Link
          href={'/dashboard/orders'}
          className='bg-primary text-white p-8 pt-2 pb-2 rounded-lg hover:opacity-70'>
          Volver
        </Link>
      </div>
    </div>
  );
}
