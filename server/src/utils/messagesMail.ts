import { MercadoPagoConfig, MerchantOrder, Preference } from 'mercadopago'
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes'
import nodemailer from 'nodemailer'

const client = new MercadoPagoConfig({
    accessToken: process.env.Mp_TOKEN as string,
})

// Configurar transporte de correo electrónico usando nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false, // false para conexiones sin SSL
    auth: {
        user: 'tu_correo@example.com',
        pass: 'tu_contraseña_de_correo',
    },
})

export async function createPreference(preferences: PreferenceRequest) {
    const preference = new Preference(client)
    const response = await preference.create({ body: preferences })
    return response
}

export async function getMerchantOrder(id: number) {
    const merchantOrder = new MerchantOrder(client)
    const response = await merchantOrder.get({ merchantOrderId: id })
    
    // Verificar si external_reference es undefined antes de usarlo
    const externalReference = response.external_reference ?? "Sin referencia externa"
    const orderStatus = response.order_status ?? "Sin estado"
    
    // Enviar correo electrónico con la URL de respuesta
    await sendEmail(externalReference, orderStatus)

    return {
        external_reference: externalReference,
        order_status: orderStatus,
    }
}

async function sendEmail(externalReference: string, orderStatus: string) {
    // Configurar el contenido del correo electrónico
    const mailOptions = {
        from: 'tallerXpert@gmail.com',
        to: 'cliente@gmail.com',
        subject: 'Resultado de la orden en MercadoPago',
        text: `La orden con referencia externa ${externalReference} tiene el estado: ${orderStatus}`, //Aqui se llama la URL de la api Mercado pago
    }

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions)
}
