'use server'

import { technicians } from '../seed'

export const getTechnicianById = async (id: string) => {

  // conect to db 

  try {
    const technician = technicians.find(technician => technician.id === id)

    if (!technician) {
      return { ok: false, technician: null }
    }

    return { ok: true, technician }
  } catch (error) {
    return { ok: false, technician: null }
  }
}