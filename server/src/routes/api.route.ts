import { Router } from 'express'
import * as routers from '.'

const apiRoute = Router()

// Itera sobre cada enrutador y agrégalo a la ruta principal. Revisa el index.ts para usar la tecnica barrel y agrega las rutas
Object.entries(routers).forEach(([key, router]) => {
	apiRoute.use(`/${key}`, router)
})

export default apiRoute
