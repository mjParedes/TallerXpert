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
import Swal from "sweetalert2";
import { Alert } from "../icons/Alert";
import ReactDOMServer from "react-dom/server";
import { deleteReparation } from "@/app/dashboard/orders/orderRequest";

// export const CardOrders = ({ order }: OrderProps) => {
  export const CardOrders = ({ reparation, onDelete }: any) => {

  const date = new Date(reparation.created_at);
  const day = date.getDate()
  const month = date.getMonth() + 1;
  const year = date.getFullYear()

  const handleDelete = async () => {
    const titleContent = ReactDOMServer.renderToString(<div className="flex flex-row items-center gap-2 justify-center"><Alert /> ATENCION!</div>);
    const result = await Swal.fire({
      title: titleContent,
      text: "¿Está seguro que desea eliminar la orden?",
      showCancelButton: true,
      confirmButtonColor: "#6264D5",
      cancelButtonColor: "#4F3E9C",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar"
    })
    if (result.isConfirmed) {
      try {
        onDelete(reparation.id)
        Swal.fire({
          title: "Eliminada",
          text: "La orden fue eliminada correctamente",
          confirmButtonText: "Aceptar"
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un error al eliminar la orden",
          confirmButtonText: "Aceptar"
        });
      }
    }

  }

  return (
    <div className="grid grid-cols-6 items-center px-6 py-5 rounded-lg shadow-md bg-secondary">
      <Link href={`orders/${reparation?.id}`} className="col-span-5 grid grid-cols-5">
        <p className="text-sm">{reparation.ot_number}</p>
        <p className="text-sm">{reparation.client.fullName}</p>
        <p className="text-sm ">{reparation.client.phone}</p>
        <p className="text-sm">{reparation.client.address}</p>
        <p className="text-sm text-center">{day}-{month}-{year}</p>
      </Link>

      <div className="col-span-1  flex flex-row gap-6 justify-center">
        <Link href={`orders/edit-order/${reparation.ot_number}`} className="h-6">
          <Edit width={24} height={24} />
        </Link>
        <button className="h-6" onClick={handleDelete}>
          <Delete width={24} height={24} />
        </button>
      </div>
    </div>
  )
}