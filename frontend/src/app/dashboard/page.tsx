import { CardItem, Order, Report, Supplier } from "@/components"
import { titleFont } from "@/config/fonts";
import { getDateFormat } from "@/utils";
import { CardDashboardProps } from "@/interfaces";
import { getTechnicians, getOrders } from "@/actions";
import Image from "next/image";
import clsx from "clsx";

const cards: CardDashboardProps[] = [
  {
    icon: <Order />,
    title: 'nueva orden de trabajo',
    total: 60123,
    className: 'bg-[#F1CC5B]',
    link: '/dashboard/orders'
  },
  {
    icon: <Report />,
    title: 'nuevo informe de trabajo',
    total: 5,
    className: 'bg-[#8A7CC9]',
    link: '',
  },
  {
    icon: < Supplier />,
    title: 'agregar proveedor',
    total: 10,
    className: 'bg-[#EB6196]',
    link: '/dashboard/suppliers'
  },
  {
    icon: <Report />,
    title: 'consultar reparación',
    total: 50148,
    className: 'bg-[#34A853]',
    link: '',
  },
]

export default async function DashboardPage({
  searchParams
}: {
  searchParams: {
    query?: string
  }
}) {

  const query = searchParams?.query || ''
  const response = await getTechnicians(query)
  const technicians = response.technicians || []

  const { orders } = await getOrders()

  const articles = orders.flatMap(order => order.product)

  return (
    <>
      {/*  section 1 */}
      <div className="md:flex">
        {/* cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8">
          {
            cards.map((card, index) => (
              <CardItem key={index} card={card} />
            ))
          }
        </div>

        {/*  technicians */}
        <div className="p-4 ml-4 border rounded-lg flex-grow flex-col gap-4">
          <h1 className={`${titleFont.className} font-bold text-2xl text-black antialiased`}>Tecnicos registrados</h1>

          <div className="mt-4 flex flex-col gap-4">
            {
              technicians.map((technician, index) => (
                <div key={index} className="flex items-center gap-8 p-3 rounded bg-secondary">
                  <Image src={technician.avatar ? technician.avatar : '/avatar'} alt="avatar" width={50} height={50} className="rounded-full" />
                  <p className="text-black">{technician.fullName}</p>
                </div>
              ))
            }
          </div>

        </div>
      </div>

      {/* section2 */}
      <div className="flex mt-8 gap-6">
        {/* pending articles */}
        <div className="w-1/2">
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className={`${titleFont.className} font-bold text-2xl text-black antialiased`}>Artículos pendientes</h1>
              <h1 className={`${titleFont.className} text-base text-black antialiased`}>Totales: {articles.length}</h1>
            </div>
            {
              orders.length === 0 ? (
                <p className="text-black">No hay artículos pendientes</p>
              ) : (
                articles.map((article, index) => (
                  <div key={index} className="flex w-full justify-between items-center p-4 rounded bg-secondary text-xs">
                    <p className="font-semibold">000-000{article.id}</p>
                    <p className="capitalize">{article.name}</p>
                    <p className={
                      clsx(
                        'border rounded-full h-6 py-1 px-5 flex justify-center items-center uppercase font-semibold',
                        {
                          'bg-[#F1CC5B] text-black': article.status === 'pending',
                          'bg-[#B9B8B8] text-black': article.status === 'waiting',
                          'bg-[#34A853] text-white': article.status === 'repaired',
                          'bg-[#EB6196] text-white': article.status === 'delivered',
                          'bg-[#252525] text-white': article.status === 'returned',
                        }
                      )
                    }
                    ><span>{article.status}</span></p>
                    <p>{getDateFormat(article.date)}</p>
                  </div>
                ))
              )
            }
          </div>
        </div>

        {/* orders finish */}
        <div className="w-1/2">
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className={`${titleFont.className} font-bold text-2xl text-black antialiased`}>Ordenes finalizadas</h1>
              <h1 className={`${titleFont.className} text-base text-black antialiased`}>Totales: {orders.length}</h1>
            </div>
            {
              orders.length === 0 ? (
                <p className="text-black">No hay ordenes finalizadas</p>
              ) : (
                orders.map((order, index) => (
                  <div key={index} className="flex w-full justify-between items-center p-4 rounded bg-secondary text-xs">
                    <p className="font-semibold">000-000{order.id}</p>
                    <p className="capitalize">{order.client[0].fullName}</p>
                    <p className={
                      clsx(
                        'border rounded-full h-6 py-1 px-5 flex justify-center items-center uppercase  text-white',
                        {
                          'bg-violet': order.status === 'closed',
                          'bg-[#B9B8B8]': order.status === 'opened',
                        }
                      )
                    }
                    ><span>{order.status}</span></p>
                    <p>{getDateFormat(order.date)}</p>
                  </div>
                ))
              )
            }
          </div>
        </div>

      </div>
    </>
  );
}