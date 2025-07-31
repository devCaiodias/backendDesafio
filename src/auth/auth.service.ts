import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email)
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        throw new Error('Credenciais Inválidas')
    }

    async login(user: any) {
        const payload = { sub: user.id , email: user.email }
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(data: any) {
        const hashedPassword = await bcrypt.hash(data.password, 10)
        return this.usersService.create({
            ...data,
            password: hashedPassword
        })
    }
}