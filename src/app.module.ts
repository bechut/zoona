import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthenModule } from './authen/authen.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards/access-token.guard';
import { JwtModule } from './packages/jwt/jwt.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [JwtModule, UserModule, AuthenModule, PlayerModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
