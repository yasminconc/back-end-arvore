import { User } from '@prisma/client';
import { prisma } from './DataBase';

export class UserData {
    create = async (id: string, name: string, email: string, birthDate: string, password:string): Promise<void> => {
        try {
            await prisma.user.create({
                data:{
                    id,
                    name,
                    email,
                    birthDate,
                    password
                }
            })
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getUserByEmail = async (email: string): Promise<User | null> => {
        try {
            return await prisma.user.findUnique({
                where: {email: email}
            })
            
        } catch (error:any) {
            throw new Error(error.message) 
        }
    }
}