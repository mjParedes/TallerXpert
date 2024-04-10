import Image from "next/image"

export const HeroHome = () => {
  return (
    <section className=' py-14 relative mb-2 md:mb-24'>
      <div className='container mx-auto px-8 md:px-3 relative z-10 '>
        <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4 md:min-h-screen'>
          <div className='md:col-span-1 flex mb-4 md:mb-0 flex-col justify-center'>
            <div>
              <h1 className='text-5xl mb-2 md:text-6xl inline-block font-extrabold md:mb-4 text-black'>
                Gestionar tu <br className='hidden md:block' /> taller nunca fue
                <br className='hidden md:block' /> tan fácil
              </h1>
              <p className='text-black mb-6 text-xs md:text-base my-4 md:mt-0'>
                Nuestro sistema de gestión de talleres agiliza cada parte de la operación, hacemos que administrar su taller sea más fácil que nunca. ¡Deja que nuestra plataforma impulse tu negocio y te ayude a destacar en el mercado!
              </p>
              <button className="text-white font-bold text-sm md:text-base px-8 py-[14px] w-full md:w-[340px] md:py-6 rounded-lg  bg-primary">¡Empieza a crear tu cuenta GRATIS!</button>
            </div>
          </div>
          <div className='md:col-span-1 justify-center items-center invisible md:visible ml-4'>
            <Image src={'/iStock-1624686457.jpg'} alt="" width={640} height={427}/>
          </div>
        </div>
      </div>
      <div className="bg-secondary rounded-full w-[700px] h-[700px]  md:w-[900px] md:h-[900px] absolute top-[-200px] left-[-350px] md:top-[-200px] md:left-[-260px] -z-10"></div>
     
    </section>
  )
}
