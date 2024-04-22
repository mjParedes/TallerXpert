import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import { Input } from "./Input"
import { Client } from "@/app/dashboard/orders/interface"

interface NewClientProps {
    setClient: Dispatch<SetStateAction<Client>>
}

export const NewClient = ({setClient}: NewClientProps) => {

    const [formDataClient, setFormDataClient] = useState({
        fullName: '',
        dni: '',
        address: '',
        city: '',
        phone: '',
        email: ''
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormDataClient((prevClient) => ({ ...prevClient, [name]: value }))
    }

    useEffect(() => {
        setClient(formDataClient);
    },[formDataClient, setClient])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <div className="bg-[#ffffff] shadow-md rounded-lg flex flex-col  px-4 py-6">
            <div>
                <p className="font-bold">Datos de Cliente</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-4 py-6">
                <Input
                    label="Nombre y Apellido"
                    id="fullName"
                    name="fullName"
                    value={formDataClient.fullName}
                    onChange={handleChange}
                    placeholder="Nombre y Apellido"
                />
                <Input
                    label="DNI"
                    id="dni"
                    name="dni"
                    value={formDataClient.dni}
                    onChange={handleChange}
                    placeholder="DNI"
                />
                <Input
                    label="Dirección"
                    id="address"
                    name="address"
                    value={formDataClient.address}
                    onChange={handleChange}
                    placeholder="Dirección"
                />
                <Input
                    label="Ciudad"
                    id="city"
                    name="city"
                    value={formDataClient.city}
                    onChange={handleChange}
                    placeholder="Ciudad"
                />
                <Input
                    label="Telefono"
                    id="phone"
                    name="phone"
                    value={formDataClient.phone}
                    onChange={handleChange}
                    placeholder="Telefono"
                />
                <Input
                    label="Email"
                    id="email"
                    name="email"
                    value={formDataClient.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
            </form>
        </div>
    )
}
