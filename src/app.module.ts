import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthenModule } from './authen/authen.module';

@Module({
  imports: [UserModule, AuthenModule],
  controllers: [AppController],
})
export class AppModule {}
