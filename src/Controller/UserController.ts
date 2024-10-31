import { Request, Response } from "express"
import { UserBussiness } from "../Business/UserBusiness"
import { CustomError } from "../Models/CustomError"


export class UserController {
    constructor(private userBusiness: UserBussiness){}

    signup = async (req: Request, res: Response) => {
        try {
            const { name, email, birthDate, password } = req.body

            const result: string = await this.userBusiness.signup(name,email,birthDate,password)

            res.status(201).send({ message: 'Sucess', token: result})
            
        } catch (error:any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send(error.message)
              } else {
                res.status(404).send(error.message)
              }
        }
    }


    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            const result: string | undefined = await this.userBusiness.login(email,password)

            res.status(200).send({ message: 'Sucess', token: result})
            
        } catch (error:any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send(error.message)
              } else {
                res.status(404).send(error.message)
              }
        }
    }

}