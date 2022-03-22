import { Router } from 'express'
const router = Router()
import * as userCtrl from '../controllers/user.controller'
import { authJwt, varifysignup, verifySignup } from '../middlewares'

router.post('/',[
    authJwt.verifyToken,
    authJwt.isUser,
    verifySignup.checkRolesExisted
], userCtrl.createUser )

export default router