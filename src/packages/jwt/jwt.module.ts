import { JwtModule as Jm } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    Jm.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
