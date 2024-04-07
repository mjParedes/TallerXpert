'use server'

interface WorkshopForm {
  name: string;
  direction: string;
  city: string;
  phone: string;
  email: string;
  cuit: string;
  specializedField: string;
  logoImage?: string;
}

export const createWorkshop = async (data: WorkshopForm) => {

  try {

    return { ok: true }
  } catch (error) {
    return { ok: false }
  }
}