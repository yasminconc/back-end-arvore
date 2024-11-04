import { Request, Response } from "express"
import { CustomError } from "../Models/CustomError"
import { UserBusiness } from "../Business/UserBusiness"

export class UserController {
    constructor(private userBusiness: UserBusiness){}

    signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, birthDate, password } = req.body

            const result: string = await this.userBusiness.signup(name,email,birthDate,password)

            res.status(201).send({ message: 'Success', token: result})  
        } catch (error:any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send(error.message)
              } else {
                res.status(404).send(error.message)
              }
        }
    }

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body

            const result: string = await this.userBusiness.login(email,password)

            res.status(200).send({ message: 'Success', token: result})
        } catch (error:any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send(error.message)
              } else {
                res.status(404).send(error.message)
              }
        }
    }
}