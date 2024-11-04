import express from 'express'
import { UserData } from '../Data/UserData'
import { IdGenerator } from '../Services/IdGenerator'
import { HashManager } from '../Services/HashManager'
import { TokenManager } from '../Services/TokenManager'
import { UserBusiness } from '../Business/UserBusiness'
import { UserController } from '../Controller/UserController'

export const userRouter = express.Router()

const userBusiness: UserBusiness = new UserBusiness(
    new UserData(),
    new IdGenerator(),
    new HashManager(),
    new TokenManager()
)

const userController: UserController = new UserController(userBusiness)


userRouter.post('/signup', userController.signup)

userRouter.post('/login', userController.login)
