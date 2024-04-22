'use server'

import { technicians } from '../seed'
import { revalidatePath } from "next/cache";

export const deleteTechnician = async (id: string) => {
  try {
    const index = technicians.findIndex(technician => technician.id === id)

    if (index === -1) {
      return { ok: false }
    }

    technicians.splice(index, 1)


    revalidatePath('/dashboard/technicians')
    return { ok: true }
  } catch (error) {
    return { ok: false }
  }
}