export const HeroHome = () => {
  return (
    <section className='bg-white py-14 relative'>
      <div className='container mx-auto px-3 relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4 md:min-h-screen'>
          <div className='md:col-span-1 flex mb-4 md:mb-0 flex-col justify-center'>
            <div>
              <h1 className='text-4xl mb-2 md:text-6xl inline-block font-extrabold md:mb-4 text-black'>
                Gestionar tu <br className='hidden md:block' /> taller nunca fue
                <br className='hidden md:block' /> tan fácil
              </h1>
              <p className='text-black'>
                Lorem ipsum dolor sit amet consectetur. Eleifend at arcu felis ultricies. <br />
                Semper ut eu quisque vel eget in eu ligula.
              </p>
            </div>
          </div>
          <div className='md:col-span-1 flex flex-col justify-center items-center'>
            <img src='./iStock-1624686457.jpg' alt='' />
          </div>
        </div>
      </div>
      <svg
        width='1440'
        height='376'
        preserveAspectRatio='none'
        viewBox='0 0 1440 376'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute bottom-0 right-0 w-full z-0'
      >
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M0 272.05L80 245.458C160 218.867 320 166.892 480 114.917C640 62.942 800 10.9671 960 1.29736C1120 -7.16366 1280 27.8892 1360 44.8112L1440 62.942V376H1360C1280 376 1120 376 960 376C800 376 640 376 480 376C320 376 160 376 80 376H0V272.05Z'
          fill='#B9B8B8'
        />
      </svg>
    </section>
  )
}
