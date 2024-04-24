'use server'

interface RegisterUser {
  fullName: string
  email: string
  password: string
}

export const registerUser = async (data: RegisterUser) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      return {
        ok: false,
        message: 'Error al crear el usuario'
      }
    }

    const user = await response.json()

    if (!user) {
      return {
        ok: false,
        message: 'Error al crear el usuario'
      }
    }

    const { password: _, ...userWithoutPassword } = user

    return {
      ok: true,
      message: 'Usuario creado correctamente',
      userWithoutPassword
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al crear el usuario'
    }
  }
}
