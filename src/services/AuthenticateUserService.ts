import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        //verificar se email existe
        const user = await usersRepositories.findOne({
            email

        });

        if (!user) {
            throw new Error("Email/Password incorrect");
        }

        //verificar se senha esta correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }


        // Gerar Token
        const token = sign(
            {
                email: user.email
            }
            , "af56115fa7dfde1f0fb95d932e3955a1",
            {
                subject: user.id,
                expiresIn: "1d",
            }
        );
        return token;

    }
}

export { AuthenticateUserService }