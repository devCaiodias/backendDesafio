// Exemplo mínimo para JwtAuthGuard
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenBlacklistService } from './token-blacklist.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private blacklistService: TokenBlacklistService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const token = authHeader.split(' ')[1];

    // Checa se o token está na blacklist
    if (this.blacklistService.has(token)) {
      throw new UnauthorizedException('Token foi revogado');
    }

    try {
      const decoded = this.jwtService.verify(token);
      req.user = decoded;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
