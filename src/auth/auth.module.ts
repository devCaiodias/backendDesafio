import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt.guard';
import { TokenBlacklistService } from './token-blacklist.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, TokenBlacklistService],
  exports: [AuthService, JwtModule, JwtAuthGuard, TokenBlacklistService],
})
export class AuthModule {}
