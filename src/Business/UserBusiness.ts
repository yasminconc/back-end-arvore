import { User } from "@prisma/client";
import { UserData } from "../Data/UserData";
import { CustomError } from "../Models/CustomError";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager } from "../Services/TokenManager";


export class UserBussiness {
    constructor(
        private userData: UserData,
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

            const verifyEmail = await this.userData.getUserByEmail(email)

            if(verifyEmail){
                throw new CustomError(409, 'Email already exists')
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


    login = async (email: string, password: string) => {
        try {
            if(!email){
                throw new CustomError(400, 'Enter an email address');

            }else if(email.indexOf("@") === -1){
                throw new CustomError(400, 'Enter a valid email address');   
            }

            const user = await this.userData.getUserByEmail(email)

            if(!user){
                throw new CustomError(401, 'Invalid email')
            }

            if(!password){
                throw new CustomError(400, 'Enter a password')
            }

            const verifyPassword = await this.hashManager.compare(password, user.password)

            if(!verifyPassword){
                throw new CustomError(400,'Invalid password');
                
            }

            const token = this.tokenManager.generateToken({id: user.id})

            return token
            
        } catch (error:any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}

// const user = await this.userData.getUserByEmail(email)

// if(user){
//     throw new CustomError(409, 'The user already exists');  
// }


// const id = this.idGenerator.generateId() 

// const hashPassword = await this.hashManager.hash(password)

// const token = this.tokenManager.generateToken({id})


// await this.userData.signup(
//     new User(
//         id,
//         name,
//         email,
//         hashPassword
//     )
// )

// return token