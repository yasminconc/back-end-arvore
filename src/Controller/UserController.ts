import { Request, Response } from "express"
import { CustomError } from "../Models/CustomError"
import { UserBusiness } from "../Business/UserBusiness"
import { EditProfileBody, TreatedProfile } from "../Models/Requests"

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

    getProfile = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: string = req.headers.authorization as string

            const response: TreatedProfile | null = await this.userBusiness.getProfile(token)

            res.status(200).send({message: "Success", response})
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(404).send(error.message);
            }
        }
    };

    editProfile = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: string = req.headers.authorization as string;
			const body: EditProfileBody = req.body;

			await this.userBusiness.editProfile(token, body);

			res.status(200).send({ message: 'Success', response: 'Usuário atualizado com sucesso' });
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(404).send(error.message);
            }
        }
    };

    updatePassword = async (req: Request, res: Response) => {
        try {
            const token: string = req.headers.authorization as string

            const {currentPassword, newPassword} = req.body

            await this.userBusiness.updatePassword(token, currentPassword, newPassword)

            res.status(200).send({ message: 'Success', response: 'Senha atualizada com sucesso' });
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(404).send(error.message);
            }
        }
    };

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: string = req.headers.authorization as string

           await this.userBusiness.deleteUser(token)

            res.status(200).send({message: "Success", response: "Usuário deletado com sucesso"})
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(404).send(error.message);
            }
        }
    };
}