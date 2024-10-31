import * as bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

export class HashManager {
    hash = async (password:string): Promise <string> => {
        const rounds: number = Number( process.env.SECRET_KEY )
        const salt: string =  await bcrypt.genSalt(rounds)

        return bcrypt.hash(password, salt)
    }

    compare = async (password: string, hashPassword: string): Promise <Boolean> => {
        return await bcrypt.compare(password, hashPassword)
    }
}