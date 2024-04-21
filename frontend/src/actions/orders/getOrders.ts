'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { orders } from '@/actions/seed'

export const getOrders = async () => {
  // conect to db 

  try {
    noStore()

    return { ok: true, orders }
  } catch (error) {
    return { ok: false, orders: [] }
  }
}