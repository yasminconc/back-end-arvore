import express from 'express'
import { UserController } from '../Controller/UserController'
import { UserBussiness } from '../Business/UserBusiness'
import { IdGenerator } from '../Services/IdGenerator'
import { HashManager } from '../Services/HashManager'
import { TokenManager } from '../Services/TokenManager'
import { UserData } from '../Data/UserData'

export const userRouter = express.Router()

const userBusiness: UserBussiness = new UserBussiness(
    new UserData(),
    new IdGenerator(),
    new HashManager(),
    new TokenManager()
)

const userController: UserController = new UserController(userBusiness)

userRouter.post('/signup', userController.signup)

userRouter.post('/login', userController.login)



