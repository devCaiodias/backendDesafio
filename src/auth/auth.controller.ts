import { Body, Controller, Post, Req, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt.guard";
import { TokenBlacklistService } from "./token-blacklist.service";

@Controller('auth')
export class AuthController {
    [x: string]: any;
    constructor(
        private readonly authService: AuthService,
        private blacklistService: TokenBlacklistService

    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@Req() req) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Token não fornecido');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    this.blacklistService.add(token);

    

    return { message: 'Logout realizado com sucesso' };
    }

    @Post('register')
    register(@Body() body: any) {
        return this.authService.register(body)
    }
    
    @Post('login')
    async login(@Body() body: any) {
        const user = await this.authService.validateUser(body.email, body.password)
        return this.authService.login(user)
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('userLogado')
    getProfile(@Request() req) {
        return req.user
    }
}  