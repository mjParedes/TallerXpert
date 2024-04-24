import { CardsDashboard } from "@/components"
import { titleFont } from "@/config/fonts";
import { getDateFormat } from "@/utils";
import { getTechnicians, getOrders } from "@/actions";
import Image from "next/image";
import clsx from "clsx";

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

  const articles = orders?.flatMap(order => order.products)

  return (
    <>
      {/*  section 1 */}
      <div className="md:flex">
        {/* cards */}
        <CardsDashboard />

        {/*  technicians */}
        <div className="p-4 ml-4 border rounded-lg flex-grow flex-col gap-4">
          <h1 className={`${titleFont.className} font-bold text-2xl text-black antialiased`}>Tecnicos registrados</h1>

          <div className="mt-4 flex flex-col gap-4">
            {
              technicians.length === 0 ? (
                <h1 className="text-center">Aún no hay técnicos agregados</h1>
              ) : (
                technicians.map((technician, index) => (
                  <div key={index} className="flex items-center gap-8 p-3 rounded bg-secondary">
                    <Image src='/avatarTechnician1.png' alt="avatar" width={50} height={50} className="rounded-full" />
                    <p className="text-black">{technician.fullName}</p>
                  </div>
                ))
              )
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
                    <p className="font-semibold">000- {article.id.split('-').at(1)}</p>
                    <p className="capitalize">{article.product_name}</p>
                    <p className={
                      clsx(
                        'border rounded-full h-6 py-1 px-5 flex justify-center items-center uppercase font-semibold',
                        {
                          'bg-[#F1CC5B] text-black': article.state === 'Pendiente' || article.state === null,
                          'bg-[#B9B8B8] text-black': article.state === 'en espera',
                          'bg-[#34A853] text-white': article.state === 'reparado',
                          'bg-[#EB6196] text-white': article.state === 'entregado',
                          'bg-[#252525] text-white': article.state === 'devuelto',
                        }
                      )
                    }
                    ><span>{article.state !== null ? article.state : 'Pendiente'}</span></p>
                    <p>{getDateFormat(article.entry_date)}</p>
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
                    <p className="font-semibold">000-{order.ot_number}</p>
                    <p className="capitalize">{order.client.fullName}</p>
                    <p className={
                      clsx(
                        'border rounded-full h-6 py-1 px-5 flex justify-center items-center uppercase  text-white',
                        {
                          'bg-violet': order.state === 'Closed',
                          'bg-[#B9B8B8]': order.state === 'Openened',
                        }
                      )
                    }
                    ><span>{order.state}</span></p>
                    <p>{getDateFormat(order.created_at)}</p>
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