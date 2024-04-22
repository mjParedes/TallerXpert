import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"
import { Button } from "../button/Button"
import { Input } from "./Input"
import { Products } from "@/app/dashboard/orders/interface"

interface NewItemProps {
    setProducts: Dispatch<SetStateAction<Products[]>>
}

export const NewItem = ({ setProducts }: NewItemProps) => {

    const [formDataItem, setFormDataItem] = useState<Products>({
        product_name: '',
        product_category: '',
        brand: '',
        model: '',
        serial_number: '',
        issue_detail: '',
        detail: '',
        warranty_date: '',
        warranty_invoice_number: '',
        revision_cost: ''
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormDataItem((prevProducts) => ({ ...prevProducts, [name]: value }))
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    const createProduct = () => {
        console.log("art Nuevo")
        setProducts(prevItem => [...prevItem, formDataItem])
    }

    const cancelarArt = () => {
        console.log("art cancelado")
    }

    return (
        <div className="bg-[#ffffff] shadow-md rounded-lg  px-4 py-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Input
                    label="Articulo"
                    id="product_name"
                    name="product_name"
                    value={formDataItem.product_name}
                    onChange={handleChange}
                    placeholder="Articulo"
                />
                <Input
                    label="Categoría"
                    id="product_category"
                    name="product_category"
                    value={formDataItem.product_category}
                    onChange={handleChange}
                    placeholder="Categoría"
                />
                <Input
                    label="Marca"
                    id="brand"
                    name="brand"
                    value={formDataItem.brand}
                    onChange={handleChange}
                    placeholder="Marca"
                />
                <Input
                    label="Modelo"
                    id="model"
                    name="model"
                    value={formDataItem.model}
                    onChange={handleChange}
                    placeholder="Modelo"
                />
                <Input
                    label="N° Serie"
                    id="serial_number"
                    name="serial_number"
                    value={formDataItem.serial_number}
                    onChange={handleChange}
                    placeholder="N° Serie"
                />
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
                            <input type="date" placeholder="" className="h-8 w-36 pl-2 rounded bg-secondary" />
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <label>Factura N°</label>
                            <input
                                id="warranty_invoice_number"
                                name="warranty_invoice_number"
                                value={formDataItem.warranty_invoice_number}
                                onChange={handleChange}
                                placeholder="Factura N°" 
                                className="h-8 pl-2 rounded bg-secondary" />
                        </div>
                    </div>
                    <Input
                        label="Costo de Revisión"
                        id="revision_cost"
                        name="revision_cost"
                        value={formDataItem.revision_cost}
                        onChange={handleChange}
                        placeholder="Costo de Revisión"
                    />
                </div>
            </form>

            <Button title="Crear Articulo" onClick={createProduct} />
        </div>
    )
}
