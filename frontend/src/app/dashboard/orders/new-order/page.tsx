"use client"

import { Orders, Title } from "@/components";
import { Button } from "@/components/button/Button";
import { CardItem } from "@/components/dashboard-orders/cardItem";
import { NewClient } from "@/components/dashboard-orders/newClient";
import { NewItem } from "@/components/dashboard-orders/newItem";

export default function OrdersPage() {

    const date = new Date();
    const day= date.getDate()
    const month= date.getMonth()+1;
    const year = date.getFullYear()

    // console.log(date)
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
                    {/* <NewClient /> */}
                    <p className="text-base font-bold mt-7 mb-4">Articulos agregados</p>
                    <div className="flex flex-col gap-4 h-40">
                        {/* <CardItem /> */}
                        {/* <CardItem /> */}
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button title="Guardar" onClick={guardarOrden} />
                        <Button title="Cancelar" onClick={cancelarOrden} />
                    </div>
                </div>
                {/* <NewItem /> */}
            </div>
        </div>
    );
}