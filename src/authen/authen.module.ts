import { Module } from '@nestjs/common';
import { AuthenController } from './authen.controller';
import { JwtModule } from '../packages/jwt/jwt.module';

@Module({
  imports: [JwtModule],
  controllers: [AuthenController],
})
export class AuthenModule {}
