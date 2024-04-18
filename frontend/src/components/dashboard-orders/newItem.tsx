import { Button } from "../button/Button"

export const NewItem = () => {

    const añadirArt = () => {
        console.log("art Nuevp")
    }

    const cancelarArt = () => {
        console.log("art cancelada")
    }

    return (
        <div className="bg-white rounded-lg  px-4 py-6">
            <form className="flex flex-col gap-7">                
                <div className="flex flex-row justify-between items-center gap-8">
                    <label>Articulo</label>
                    <input name="fArticulo" type="text" placeholder="Articulo" className="h-8 w-80 rounded bg-secondary pl-3" />
                </div>
                <div className="flex flex-row justify-between items-center gap-8">
                    <label>Marca</label>
                    <input type="text" placeholder="Marca" className="h-8 w-80 rounded bg-secondary pl-3" />
                </div>
                <div className="flex flex-row justify-between items-center gap-8">
                    <label>Modelo</label>
                    <input type="text" placeholder="Modelo" className="h-8 w-80 rounded bg-secondary pl-3" />
                </div>
                <div className="flex flex-row justify-between items-center gap-8">
                    <label>N° Serie</label>
                    <input type="number" placeholder="N° Serie" className="h-8 w-80 rounded bg-secondary pl-3" />
                </div>
                <div className="flex flex-col w-full items-start gap-2">
                    <label>Daño reportado</label>
                    <textarea className="h-16 w-full rounded bg-secondary"></textarea>
                </div>
                <div className="flex flex-col w-full items-start gap-2">
                    <label>Notas</label>
                    <textarea className="h-20 w-full rounded bg-secondary"></textarea>
                </div>
                <p className="text-base font-bold">Datos de garantía</p>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row justify-between gap-6">
                        <div className="flex flex-row items-center gap-4">
                            <label>Fecha</label>
                            <input type="date" placeholder="" className="h-8 w-36 rounded bg-secondary" />
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <label>Factura N°</label>
                            <input type="number" placeholder="" className="h-8 w-52 rounded bg-secondary" />
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-4 justify-between">
                        <label>Costo de Revisión</label>
                        <input type="number" placeholder="" className="h-8 w-80 rounded bg-secondary" />
                    </div>
                </div>
            </form>
            
            <Button title="Crear Articulo" onClick={añadirArt} />
        </div>
    )
}
