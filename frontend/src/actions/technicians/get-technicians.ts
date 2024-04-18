'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { technicians } from './seedTechnicians'

export const getTechnicians = async () => {

  // conect to db 

  try {
    noStore()
    return { ok: true, technicians }
  } catch (error) {
    return { ok: false, technicians: [] }
  }
}