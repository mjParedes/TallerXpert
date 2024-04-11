"use client"

import Image from "next/image"
import { Title } from "../ui/title/Title"
import { useEffect } from "react";


export const SectionInterface = () => {

    useEffect(() => {
      const image = document.querySelector<HTMLElement>('.scroll-image');
      window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        const newValue = scrollValue + -600;
        if (image !== null) {
          image.style.transform = `translateY(-${newValue}px)`;
        }
      });

    //   return () => {
    //     window.removeEventListener('scroll', () => {
    //       const scrollValue = window.scrollY;
    //       image.style.transform = `translateY(-${scrollValue}px)`;
    //     });
    //   };
    }, []);
  
    return (
      <section className="relative w-full h-[600px] flex flex-col justify-end items-center overflow-hidden">
          <div className="absolute -bottom-40 -z-10 scroll-image">
              <Image src={'/dashboard.png'} alt="Dashboard TallerXpert" className="w-auto lg:w-[861] h-auto lg:h-[612.27px]" width={861} height={612.27}/>
          </div>
          <div className="w-full h-[400px] flex flex-col justify-end pb-24 gap-4 bg-gradient-to-t from-white to-transparent">
              <Title title="Contamos con una interfaz que se ajusta a tus necesidades" className='text-2xl font-black text-center' />
              <p className="font-bold text-xl text-center">Accede a todos los puntos de la aplicación desde un solo lugar</p>
          </div>
      </section>
    )
  }