
export const getAllReparation = async (session: any) => {
  console.log(session)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reparation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      }
    })
    console.log(response)
    const data = await response.json();
    return data;

  } catch (error) {
    console.log(error)
  }
};

export const createReparation = async (session: any, client: any, products: any) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reparation`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
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

export const deleteReparation = async (id: string, session: any) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reparation/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      }
    })
  } catch (error) {
    console.log(error)
  }
};

export const editReparation = async (id: string, session: any) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reparation/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      }
    })
  } catch (error) {
    console.log(error)
  }
};