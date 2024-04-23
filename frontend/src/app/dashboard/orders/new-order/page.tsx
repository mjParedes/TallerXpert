'use client'

<<<<<<< HEAD
import { Title } from '@/components'
import { Button } from '@/components/button/Button'
import { CardItem } from '@/components/dashboard-orders/cardItem'
import { NewClient } from '@/components/dashboard-orders/newClient'
import { NewItem } from '@/components/dashboard-orders/newItem'
=======
import { Orders, Title } from "@/components";
import { Button } from "@/components/button/Button";
import { CardItem } from "@/components/dashboard-orders/cardItem";
import { NewClient } from "@/components/dashboard-orders/newClient";
import { NewItem } from "@/components/dashboard-orders/newItem";
import { useState } from "react";
import { createReparation } from "../orderRequest";
import { useSession } from "next-auth/react";
import { Products } from "../interface";
>>>>>>> refact-nextAuth-David-Hilera

export default function OrdersPage() {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

<<<<<<< HEAD
  // console.log(date)
  const guardarOrden = () => {
    console.log('orden Nueva')
  }

  const cancelarOrden = () => {
    console.log('orden cancelada')
  }

  return (
    <div>
      <div className='flex flex-row justify-between mb-7'>
        <div className='flex flex-row items-center justify-center gap-2'>
          {/* <Orders /> */}
          <svg xmlns='http://www.w3.org/2000/svg' width={32} height={32} fill='none'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M12 16.5h5m-5 4h5m-5 4h5m4 1h3a3 3 0 0 0 3-3V8.644c0-1.513-1.127-2.797-2.635-2.923a64.559 64.559 0 0 0-1.497-.106m0 0c.088.286.132.585.132.885a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1c0-.308.047-.605.133-.885m7.735 0A3.002 3.002 0 0 0 20 3.5h-2a3.002 3.002 0 0 0-2.867 2.115m0 0c-.501.03-1 .066-1.498.106C12.127 5.847 11 7.131 11 8.644V11.5m0 0H6.5A1.5 1.5 0 0 0 5 13v15a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 21 28V13a1.5 1.5 0 0 0-1.5-1.5H11Zm-2 5h.01v.01H9v-.01Zm0 4h.01v.01H9v-.01Zm0 4h.01v.01H9v-.01Z'
            />
          </svg>
          <Title title='Nueva Orden' />
=======
    const { data: session, status } = useSession();

    const [products, setProducts] = useState<Products[]>([])
    const [client, setClient] = useState({
        fullName: '',
        dni: '',
        address: '',
        city: '',
        phone: '',
        email: ''
    })

    const date = new Date();
    const day = date.getDate()
    const month = date.getMonth() + 1;
    const year = date.getFullYear()

    const guardarOrden = async () => {
        try {
            console.log("datos del cliente: ", client)
            console.log("datos de productos: ", products)
            // await createReparation(session, client, products)
        } catch (error) {
            console.error("Error al guardar la orden: ", error)
        }
    }

    const cancelarOrden = () => {
        console.log("orden cancelada")
    }

    return (
        <div>
            <div className="flex flex-row justify-between mb-7">
                <div className="flex flex-row justify-center items-center gap-2">
                    <Orders />
                    <Title title="Nueva Orden" />
                </div>
                <p>Fecha de Ingreso: {day}/{month}/{year}</p>
            </div>
            <div className="grid grid-cols-2 justify-center gap-4">
                <div className="flex flex-col gap-4">
                    <NewClient setClient={setClient} />
                    <p className="text-base font-bold mt-7 mb-4">Articulos agregados</p>
                    <div className="flex flex-col gap-4 h-40 overflow-auto pb-2">
                        {products.length > 0
                            ?
                            <>
                                ({products?.map((product, index) =>
                                    <CardItem key={index} product={product} />
                                )})
                            </>
                            : <p>Aún no hay contenido agregado</p>
                        }
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button title="Guardar" onClick={guardarOrden} />
                        <Button title="Cancelar" onClick={cancelarOrden} />
                    </div>
                </div>
                <NewItem setProducts={setProducts} />
            </div>
>>>>>>> refact-nextAuth-David-Hilera
        </div>
        <p>
          Fecha de Ingreso: {month}/{day}/{year}
        </p>
      </div>
      <div className='flex flex-row justify-center gap-4'>
        <div className='flex flex-col gap-4'>
          <NewClient />
          <p className='mb-4 text-base font-bold mt-7'>Articulos agregados</p>
          <div className='flex flex-col h-40 gap-4'>
            <CardItem />
            <CardItem />
          </div>
          <div className='flex flex-row gap-2'>
            <Button title='Guardar' onClick={guardarOrden} />
            <Button title='Cancelar' onClick={cancelarOrden} />
          </div>
        </div>
        <NewItem />
      </div>
    </div>
  )
}
