'use server'

import { Technician } from "@/interfaces";
import { technicians } from './seedTechnicians'
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

type TechnicianWithoutId = Omit<Technician, 'id'>;

export const createTechnician = async (data: TechnicianWithoutId) => {
  try {
    const technicianWithDefaultAvatar = { ...data, avatar: data.avatar || '/avatar.png', id: randomUUID() };

    technicians.push(technicianWithDefaultAvatar)

    revalidatePath('/dashboard/technicians')
    return { ok: true }
  } catch (error) {
    return { ok: false }
  }
}