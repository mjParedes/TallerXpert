// type OrderProps = {
//     order: {
//         id: number,
//         nombreApellido: string,
//         articulo: string,
//         estado: "pendiente" | "enEspera" | "reparado" | "finalizado",
//         fecha: Date,
//     }
// }

import Link from "next/link"
import { Edit } from "../icons/Edit"
import { Delete } from "../icons/Delete"

// export const CardOrders = ({ order }: OrderProps) => {
export const CardOrders = () => {
  return (
    <div className="grid grid-cols-6  items-center justify-between px-6 h-14 rounded-lg shadow-md bg-secondary">
        {/* <p>{order.id}</p>
        <p>{order.nombreApellido}</p>
        <p>{order.articulo}</p>
        <p>{order.estado}</p> */}
        {/* <p>{order.fecha}</p> */}
        <p className="text-sm">Id Orden</p>
        <p className="text-sm">Nombre y Apellido</p>
        <p className="text-sm">Articulo</p>
        <p className="text-sm">Estado</p>
        <p className="text-sm">Fecha de ingreso</p>
        <div className="flex flex-row gap-6 justify-center">
            <Link href={"/"} className="h-6">
              <Edit width={24} height={24}/>
            </Link>
            <button className="h-6">
              <Delete width={24} height={24}/>
            </button>
        </div>
    </div>
  )
}