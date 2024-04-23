import { Delete } from '../icons/Delete'
import { Edit } from '../icons/Edit'

export const CardItem = ({product} : any) => {
    return (
        <div className="flex flex-row items-center justify-between px-6 py-5 rounded-lg bg-secondary shadow-md ">
            <p className="text-sm">Nombre del artículo</p>
            <p className="text-sm">Estado</p>
            <div className="flex flex-row gap-6 justify-center">
                <button className="h-6">
                    <Edit width={24} height={24} />
                </button>
                <button className="h-6">
                    <Delete width={24} height={24} />
                </button>
            </div>
        </div>
    )
}
