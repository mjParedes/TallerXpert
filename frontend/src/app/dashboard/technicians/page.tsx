import { getTechnicians } from "@/actions"
import { TechnicianGrid } from "@/components/technicians/technician-grid/TechnicianGrid"
import { titleFont } from "@/config/fonts"
import Link from "next/link"

export default async function TechniciansPage({
  searchParams
}: {
  searchParams: {
    query?: string
  }
}) {
  const query = searchParams?.query || ''
  const response = await getTechnicians(query)
  const technicians = response.technicians || []

  return (
    <div className={`flex flex-col gap-12 justify-between ${titleFont.className}`}>

      <TechnicianGrid technicians={technicians} />

      <Link href={'/dashboard'} className="bg-violet hover:opacity-85 text-white py-2 text-center rounded transition-all capitalize h-[51px] w-[174px] flex items-center justify-center">Volver</Link>
    </div>
  )
}