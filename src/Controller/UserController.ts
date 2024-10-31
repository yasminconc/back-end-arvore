import { Request, Response } from "express"


export class UserController {
    constructor(
        
    ){}


    signup = async (req: Request, res: Response) => {
        try {
            const {name, email, birthDate, password} = req.body
            
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }


    login = async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body
            
        } catch (error:any) {
            res.status(404).send(error.sqlMessage || error.message)
        }
    }

}