import {Router} from 'express'
import {home} from './home'

export const routes = Router();

routes.get('/api/1/dashboard', home);