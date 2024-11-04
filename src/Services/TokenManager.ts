import dotenv from "dotenv";
import * as  jwt from "jsonwebtoken";
import { AuthenticationData } from "../Models/AuthenticationData"

dotenv.config()

export class TokenManager {
    generateToken = (id: AuthenticationData): string => {
        return jwt.sign(
            id,
            process.env.PRIVATE_KEY as jwt.Secret,
            {
                expiresIn: process.env.TOKEN_EXPIRES
            }

        )
    }

    getTokenData = (token:string): AuthenticationData => {
        return jwt.verify(token, process.env.PRIVATE_KEY as jwt.Secret) as AuthenticationData
    }
}