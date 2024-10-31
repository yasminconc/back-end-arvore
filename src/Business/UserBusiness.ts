import { CustomError } from "../Models/CustomError";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager } from "../Services/TokenManager";


export class UserBussiness {
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager
    ){}


    signup = async (name: string, email: string, birthDate:string, password: string) => {
        try {
            if(!name){
                throw new CustomError(400, 'Enter a name');   
            }

            if(!email){
                throw new CustomError(400, 'Enter an email adress');

            }else if(email.indexOf("@") === -1){
                throw new CustomError(400, 'Enter a valid email address')
            }

            if(!password){
                throw new CustomError(400, 'Enter a password')

            }else if(password.length < 6){
                throw new CustomError(400, ' the password must be at least 6 characters long')
            }
            
        } catch (error:any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}