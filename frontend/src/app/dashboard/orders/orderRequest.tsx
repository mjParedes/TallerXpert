'use server'

import { getUserSessionServer } from "@/actions";

export const getAllReparation = async () => {
  const user = await getUserSessionServer()

  if (!user) return []

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reparation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      }
    })

    const orders = await response.json();
    return orders;

  } catch (error) {
    console.log(error)
  }
};

export const createReparation = async (client: any, products: any) => {
  
  const user = await getUserSessionServer()
  console.log('user create', user)
  if (!user) return []
  
  console.log(user.token)
  console.log(client)
  console.log(products)
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reparation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        client: client,
        products: products
      })
    })

  } catch (error) {
    console.log(error)
  }
};

export const deleteReparation = async (id: string) => {
  const user = await getUserSessionServer()
  if (!user) return []
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reparation/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      }
    })
  } catch (error) {
    console.log(error)
  }
};

export const editReparation = async (id: string) => {
  const user = await getUserSessionServer()
  if (!user) return []
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reparation/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      }
    })
  } catch (error) {
    console.log(error)
  }
};

export const getOrder = async (orderId: string) => {
  const user = await getUserSessionServer()
  if (!user) return []
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reparation/${orderId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error)
  }

}