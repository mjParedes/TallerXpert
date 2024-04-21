'use server'

import { Technician } from "@/interfaces";
import { technicians } from '../seed'
import { revalidatePath } from "next/cache";

type TechnicianWithoutId = Omit<Technician, 'id'>;

export const editTechnician = async (data: TechnicianWithoutId, id: string) => {
  try {

    const updateTechncian = technicians.find(technician => technician.id === id)

    if (!updateTechncian) {
      return { ok: false }
    }

    updateTechncian.fullName = data.fullName
    updateTechncian.email = data.email
    updateTechncian.password = data.password
    updateTechncian.phone = data.phone
    updateTechncian.address = data.address

    revalidatePath('/dashboard/technicians')
    return { ok: true }
  } catch (error) {
    return { ok: false }
  }
}