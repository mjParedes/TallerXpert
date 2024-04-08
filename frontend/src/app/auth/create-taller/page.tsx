import Link from "next/link"

const CreateTallerPage = () => {
  return (
    <div>
      <h1>Formulario para crear taller</h1>
      <Link href="/admin" className="bg-blue-300 p-2">
        Crear taller
      </Link>
    </div>
  )
}

export default CreateTallerPage