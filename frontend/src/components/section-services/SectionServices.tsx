import { CardService, Title } from ".."

export const SectionServices = () => {

  const services = [
    {
      title: 'Cotiza tu servicio',
      description: 'Cotiza el servicio que necesitas para tu vehículo y recibe una respuesta en menos de 24 horas.'
    },
    {
      title: 'Agenda tu cita',
      description: 'Agenda tu cita en el taller más cercano a tu ubicación y recibe un recordatorio el día de tu cita.'
    },
    {
      title: 'Revisa el estado de tu vehículo',
      description: 'Recibe notificaciones en tiempo real sobre el estado de tu vehículo y el avance de tu servicio.'
    },
    {
      title: 'Paga en línea',
      description: 'Paga tu servicio en línea y recibe tu factura en tu correo electrónico.'
    }
  ]

  return (
    <section className="w-full max-w-[1440px] mx-auto flex flex-col items-center justify-center">
      <Title title="¿Qué te ofrece MiTaller" className='text-xl text-center my-6' />

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 mb-10 px-4'>
        {
          services.map((service, index) => (
            <CardService key={index} service={service} />
          ))
        }
      </div>
    </section>
  )
}
