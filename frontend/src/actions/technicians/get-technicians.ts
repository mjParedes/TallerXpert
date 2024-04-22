'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { technicians } from '../seed'

export const getTechnicians = async (query: string) => {
  // conect to db 

  try {
    noStore()

    const filteredTechnicians = technicians.filter(technician => technician.fullName.toLowerCase().includes(query.toLowerCase()))

    return { ok: true, technicians: filteredTechnicians }
  } catch (error) {
    return { ok: false, technicians: [] }
  }
}