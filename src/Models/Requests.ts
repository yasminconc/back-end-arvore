export type CreateUserBody = {
    id: string,
    name: string,
    email: string,
    password: string,
    birthDate: string
}

export type AuthBody = {
    email: string,
    password: string
}

export type EditProfileBody = {
	name?: string;
	birthDate?: string;
};

export type TreatedProfile = {
    id: string, 
    email: string, 
    name: string, 
    birthDate: string
}