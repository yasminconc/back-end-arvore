import { prisma } from './DataBase';


export class UserData {
    create = async (id: string, name: string, email: string, birthDate: string, password:string) => {
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

    getUserByEmail = async (email: string) => {
        try {
            return await prisma.user.findUnique({
                where: {email: email}
            })
            
        } catch (error:any) {
            throw new Error(error.message) 
        }
    }
}


// getUserByEmail = async (email: string) => {
//     try {
//         const reponse = await this.connection(this.tableName)
//         .where({email: email})

//         return reponse[0]
        
//     } catch (error:any) {
//         throw new CustomError(404,error.message);
//     }

// }