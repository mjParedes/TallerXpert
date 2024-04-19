"use client"

// import { Title } from "@/components"
// import { Button } from "@/components/button/Button";
import { CardOrders } from "@/components/dashboard-orders/cardOrders";
import { CardOrdersTitle } from "@/components/dashboard-orders/cardOrdersTitle";
import Link from "next/link";
import { useState } from "react";


export default function OrdersPage() {

  const [orders, setOrders] = useState([{},{}])

  const createOrden = () => {
    console.log("orden Nueva")
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-14 ">
        <Link href={"/dashboard/orders/new-order"} className="bg-primary rounded py-4 px-[14px] text-white">Crear nueva orden</Link>
        <input type="text" placeholder="Ingresa Orden, Nombre o Apellido.." className="border rounded w-80 h-10 pl-4 text-sm" />
      </div>
      <div className="flex flex-col gap-4 mb-8 h-[600px]">
        <CardOrdersTitle />
        {orders.length > 0
          ? (
            <>
              <CardOrders />
              <CardOrders />
              <CardOrders />
              <CardOrders />
            </>
          )
          : (
            <p className="text-center">Aún No hay contenido agregado</p>
          )
        }

      </div>
      <Link href={"/dashboard"} className="bg-primary rounded py-4 px-[62px] text-white ">Volver</Link>
    </div>
  );
}