import * as  jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthenticationData } from "../Models/AuthenticationData"
dotenv.config()

export class TokenManager {

    constructor(
        private expiresIn = "3h"
    ){}

    generateToken = (id: AuthenticationData): string => {
        return jwt.sign(
            id,
            process.env.PRIVATE_KEY as jwt.Secret,

            {
                expiresIn: this.expiresIn
            }

        )
    }

    getTokenData = (token:string): AuthenticationData => {
        return jwt.verify(token, process.env.PRIVATE_KEY as jwt.Secret) as AuthenticationData
    }
}