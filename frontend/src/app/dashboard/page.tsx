import { AvatarTechnician, AvatarTechnician2, AvatarTechnician3, CardItem, Order, Report, Supplier, Title } from "@/components"
import { titleFont } from "@/config/fonts";
import { getDateFormatSpanish } from "@/utils";

interface Card {
  icon: JSX.Element;
  title: string;
  total: number;
  className?: string;
}

const cards: Card[] = [
  {
    icon: <Order />,
    title: 'nueva orden de trabajo',
    total: 60123,
    className: 'bg-[#F1CC5B]'
  },
  {
    icon: <Report />,
    title: 'nuevo informe de trabajo',
    total: 5,
    className: 'bg-[#8A7CC9]'
  },
  {
    icon: < Supplier />,
    title: 'agregar proveedor',
    total: 10,
    className: 'bg-[#EB6196]'
  },
  {
    icon: <Report />,
    title: 'consultar reparación',
    total: 50148,
    className: 'bg-[#34A853]'
  },
]

const technicians = [
  {
    name: 'Juan Perez',
    avatar: <AvatarTechnician />
  },
  {
    name: 'Maria Lopez',
    avatar: <AvatarTechnician2 />
  },
  {
    name: 'Pedro Rodriguez',
    avatar: <AvatarTechnician3 />
  },
]

const orders = [
  {
    id: 1,
    date: new Date('2021-09-01'),
    description: 'reparación de lavadora',
    technician: 'Juan Perez',
    status: 'pendiente'
  },
  {
    id: 2,
    date: new Date('2021-09-02'),
    description: 'reparación de refrigerador',
    technician: 'Maria Lopez',
    status: 'en proceso'
  },
  {
    id: 3,
    date: new Date('2021-09-03'),
    description: 'reparación de secadora',
    technician: 'Pedro Rodriguez',
    status: 'finalizado'
  },
  {
    id: 4,
    date: new Date('2021-09-04'),
    description: 'reparación de lavadora',
    technician: 'Juan Perez',
    status: 'pendiente'
  },
  {
    id: 5,
    date: new Date('2021-09-05'),
    description: 'reparación de refrigerador',
    technician: 'Maria Lopez',
    status: 'en proceso'
  }
]

export default function DashboardPage() {
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
          <h1 className={`${titleFont.className} font-bold text-2xl text-black antialiased`}>Tecnicos en línea</h1>

          <div className="mt-4 flex flex-col gap-8">
            {
              technicians.map((technician, index) => (
                <div key={index} className="flex items-center gap-8 p-3 rounded bg-secondary">
                  {technician.avatar}
                  <p className="text-black">{technician.name}</p>
                </div>
              ))
            }
          </div>

        </div>

      </div>

      {/* section2 */}
      <div className="flex mt-8 gap-6">
        {/* last orders */}
        <div className="w-1/2">
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className={`${titleFont.className} font-bold text-2xl text-black antialiased`}>Últimas ordenes</h1>
              <h1 className={`${titleFont.className} text-base text-black antialiased`}>Total: {orders.length}</h1>
            </div>
            {
              orders.map((order, index) => (
                <div key={index} className="grid grid-cols-[1fr,1fr,auto] p-4 rounded bg-secondary text-[10px]">
                  <p>60000{order.id}</p>
                  <p>{order.technician}</p>
                  <p>{getDateFormatSpanish(order.date)} 06:15 pm</p>
                </div>
              ))
            }
          </div>
        </div>

        {/* orders without finish */}
        <div className="w-1/2">
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className={`${titleFont.className} font-bold text-2xl text-black antialiased`}>Ordenes sin finalizar</h1>
              <h1 className={`${titleFont.className} text-base text-black antialiased`}>Total: {orders.length}</h1>
            </div>
            {
              orders.map((order, index) => (
                <div key={index} className="grid grid-cols-[1fr,1fr,auto] p-4 rounded bg-secondary text-[10px]">
                  <p>60000{order.id}</p>
                  <p>{order.technician}</p>
                  <p>{getDateFormatSpanish(order.date)} 06:15 pm</p>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </>
  );
}