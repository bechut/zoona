import { Module } from '@nestjs/common';
import { AuthenController } from './authen.controller';

@Module({
  controllers: [AuthenController],
})
export class AuthenModule {}
