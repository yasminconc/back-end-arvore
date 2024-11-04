import { prisma } from './DataBase';
import { User } from '@prisma/client';
import { EditProfileBody, TreatedProfile } from '../Models/Requests';

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

    getUserById = async (id: string): Promise<User | null> => {
        try {
            return await prisma.user.findUnique({
                where: {id}
            })
            
        } catch (error:any) {
            throw new Error(error.message) 
        }
    }

    getProfile = async (id: string): Promise<TreatedProfile | null> => {
        try {
            return await prisma.user.findUnique({
                where: {id},
                select: {
					id: true,
					email: true,
                    name: true,
                    birthDate: true
				},
            })
        } catch (error: any) {
           throw new Error(error.message)
        }
    };

    updatePassword = async (id: string, password: string): Promise<void> => {
        try {
            await prisma.user.update({
                where: {id},
                data: {
                    password
                }
            })
        } catch (error: any) {
           throw new Error(error.message)
        }
    };  

    editProfile = async (id: string, body: EditProfileBody): Promise<void> => {
		try {
			await prisma.user.update({
				data: {
					...body,
				},
				where: { id },
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

    deleteUser = async (id: string): Promise<void> => {
        try {
            await prisma.user.delete({
                where: {id}
            })
        } catch (error: any) {
           throw new Error(error.message)
        }
    };
}