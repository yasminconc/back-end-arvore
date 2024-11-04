import { User } from "@prisma/client";
import { UserData } from "../Data/UserData";
import { CustomError } from "../Models/CustomError";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager } from "../Services/TokenManager";

export class UserBusiness {
    constructor(
        private userData: UserData,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager
    ){}

    signup = async (name: string, email: string, birthDate:string, password: string): Promise<string> => {
        try {
            const birthDateObj = new Date(birthDate)
            const today = new Date()

            if (birthDateObj > today) {
                throw new CustomError(400, 'A data de nascimento não pode ser maior que a data atual')
            }
            
            if(!name){
                throw new CustomError(400, 'Digite um nome');   
            }

            if(!email){
                throw new CustomError(400, 'Digite um email');

            }else if(email.indexOf("@") === -1){
                throw new CustomError(400, 'Digite um email válido')
            }

            if(!password){
                throw new CustomError(400, 'Digite uma senha')

            }else if(password.length < 6){
                throw new CustomError(400, 'A senha deve ter no mínimo 6 caracteres')
            }

            const verifyEmail: User | null  = await this.userData.getUserByEmail(email)

            if(verifyEmail){
                throw new CustomError(409, 'O Email já existe')
            }

            const id: string = this.idGenerator.generateId()
            const token: string = this.tokenManager.generateToken({id})
            const hashedPassword: string = await this.hashManager.hash(password)

            await this.userData.create(id,name,email,birthDate,hashedPassword)

            return token
            
        } catch (error:any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    login = async (email: string, password: string): Promise<string> => {
        try {
            if(!email){
                throw new CustomError(400, 'Digite um email');

            }else if(email.indexOf("@") === -1){
                throw new CustomError(400, 'Digite um email válido');   
            }
            if(!password){
                throw new CustomError(400, 'Dígite uma senha')
            }

            const user: User | null = await this.userData.getUserByEmail(email)

            if(!user){
                throw new CustomError(401, 'Conta não encontrada')
            }

            const verifyPassword: Boolean = await this.hashManager.compare(password, user.password)

            if(!verifyPassword){
                throw new CustomError(400,'Senha inválida');
                
            }

            const token: string = this.tokenManager.generateToken({id: user.id})

            return token
            
        } catch (error:any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}