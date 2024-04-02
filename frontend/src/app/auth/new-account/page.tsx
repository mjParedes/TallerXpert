import Link from "next/link";

export default function NewAccountPage() {
  return (
    <div>
      <h1 className="my-3">LoginPage</h1>

      <Link className="bg-blue-500 p-2 rounded" href={'/admin'}>Crear cuenta</Link>

    </div>
  )
}
