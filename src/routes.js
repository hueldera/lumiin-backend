import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth'
import multer from 'multer'
import multerConfig from './config/multer'
import hasRole from './app/middlewares/permission'
import FileController from './app/controllers/FileController'
import ProviderController from './app/controllers/ProviderController'
import Brute, { MemoryStore } from 'express-brute'
import roleConfig from './config/roles'

const routes = new Router()
const upload = multer(multerConfig)

const bruteStore = new MemoryStore()
const bruteForce = new Brute(bruteStore)
// bruteForce.prevent,
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.put('/users', UserController.update)

routes.post('/files', upload.single('file'), FileController.store)

routes.post('/users', hasRole([roleConfig.MANAGER]), UserController.store)
routes.get('/providers', hasRole([roleConfig.MANAGER]), ProviderController.index)

export default routes
