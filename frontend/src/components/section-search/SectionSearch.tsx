"use client"

import Image from "next/image"
import { Select } from "./select/Select"
import { useState } from "react";
import { Button } from "../button/Button";
import { SectionResults } from "./section-results/SectionResults";

export const SectionSearch = () => {

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
 
  const optionsCity = [
   {value: '', label: ''},
   {value: 'Ciudad 1', label: 'Ciudad 1'},
   {value: 'Ciudad 2', label: 'Ciudad 2'},
   {value: 'Ciudad 3', label: 'Ciudad 3'},
  ]
 
  const optionsItem = [
   {value: '', label: ''},
   {value: 'Rubro 1', label: 'Rubro 1'},
   {value: 'Rubro 2', label: 'Rubro 2'},
   {value: 'Rubro 3', label: 'Rubro 3'},
  ]
  
  const handleSelectCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
   setSelectedCity(event.target.value)
  }
 
  const handleSelectItem = (event: React.ChangeEvent<HTMLSelectElement>) => {
   setSelectedItem(event.target.value)
  }
 
  const handleSearch = () =>{
   console.log('busqueda')
  }

  return (
    <>
      <section className="flex flex-col lg:flex-row py-[110px] px-[72px] justify-center gap-x-24 bg-primary">
        <div className="lg:mb-0 mb-8  lg:w-2/4">
          <div className="relative h-80" >
            <Image src={'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" priority style={{ objectFit: "cover" }} />
          </div>
        </div>
        <div className="lg:w-2/4 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black text-center mb-2.5 lg:leading-[58px]">¿Buscas un Taller que se adapte a tu necesidad?</h2>
          <div className="flex flex-wrap justify-evenly py-6 gap-x-4 gap-y-6  mb-8">
            <Select options={optionsCity} value={selectedCity} onChange={handleSelectCity} title={'Ciudad'}/>
            <Select options={optionsItem} value={selectedItem} onChange={handleSelectItem} title={'Rubro'}/>
          </div>
          <Button title='Buscar' onClick={handleSearch} />
        </div>
      </section>
      <SectionResults city={selectedCity} item={selectedItem}/>
    </>
  )
}