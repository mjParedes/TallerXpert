"use client"

import { Orders, Title } from "@/components";
import { Button } from "@/components/button/Button";
import { CardItem } from "@/components/dashboard-orders/cardItem";
import { NewClient } from "@/components/dashboard-orders/newClient";
import { NewItem } from "@/components/dashboard-orders/newItem";
import { useState } from "react";

export default function OrdersPage() {

  const [products, setProducts] = useState([])

  const date = new Date();
  const day = date.getDate()
  const month = date.getMonth() + 1;
  const year = date.getFullYear()

  const guardarOrden = () => {
    console.log("orden Nueva")
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
      <div className="flex flex-row justify-center gap-4">
        <div className="flex flex-col gap-4">
          {/* Comentado para evitar error al hacer build */}
          {/* <NewClient /> */}
          <p className="text-base font-bold mt-7 mb-4">Articulos agregados</p>
          <div className="flex flex-col gap-4 h-40">
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
        {/* <NewItem setProducts={setProducts}/> */}
        {/* Comentado para evitar error al hacer build */}
      </div>
    </div>
  );
}