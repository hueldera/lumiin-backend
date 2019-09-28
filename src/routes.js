import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import BankDataController from './app/controllers/BankDataController.js'
import ContactsController from './app/controllers/ContactsController.js'
import DocumentsController from './app/controllers/DocumentsController.js'
import PartnersController from './app/controllers/PartnersController.js'
import PersonalDataController from './app/controllers/PersonalDataController.js'
import SocialMediaController from './app/controllers/SocialMediaController.js'
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

routes.get('/bankData', BankDataController.index)
routes.get('/bankData/:id', BankDataController.show)
routes.post('/bankData', BankDataController.store)
routes.put('/bankData/:id', BankDataController.update)
routes.delete('/bankData/:id', BankDataController.destroy)

routes.get('/contacts', ContactsController.index)
routes.get('/contacts/:id', ContactsController.show)
routes.post('/contacts', ContactsController.store)
routes.put('/contacts/:id', ContactsController.update)
routes.delete('/contacts/:id', ContactsController.destroy)

routes.get('/documents', DocumentsController.index)
routes.get('/documents/:id', DocumentsController.show)
routes.post('/documents', DocumentsController.store)
routes.put('/documents/:id', DocumentsController.update)
routes.delete('/documents/:id', DocumentsController.destroy)

routes.get('/partners', PartnersController.index)
routes.get('/partners/:id', PartnersController.show)
routes.post('/partners', PartnersController.store)
routes.put('/partners/:id', PartnersController.update)
routes.delete('/partners/:id', PartnersController.destroy)

routes.get('/personalData', PersonalDataController.index)
routes.get('/personalData/:id', PersonalDataController.show)
routes.post('/personalData', PersonalDataController.store)
routes.put('/personalData/:id', PersonalDataController.update)
routes.delete('/personalData/:id', PersonalDataController.destroy)

routes.get('/socialMedia', SocialMediaController.index)
routes.get('/socialMedia/:id', SocialMediaController.show)
routes.post('/socialMedia', SocialMediaController.store)
routes.put('/socialMedia/:id', SocialMediaController.update)
routes.delete('/socialMedia/:id', SocialMediaController.destroy)

export default routes
