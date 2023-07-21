import { Public } from './decorators/public.decorator';
import { Controller, Get, Query } from '@nestjs/common';
import prisma from './client';
import { v4 } from 'uuid';
import { hash, genSalt } from 'bcrypt';
import { TestValidator } from './app.validator';
@Controller()
export class AppController {
  @Get()
  async prismaUsage() {
    const findMany = await prisma.test.findMany();
    const findUniqueOrThrow = await prisma.test.findUniqueOrThrow();
    return {
      findMany,
      findUniqueOrThrow,
    };
  }

  @Get('packages')
  async packages(@Query() query: TestValidator) {
    const uuid = v4();
    const bcrypt_password = await hash(uuid, await genSalt(10));

    return {
      uuid,
      bcrypt_password,
      query,
    };
  }

  @Get('public')
  @Public()
  public() {
    return 'public';
  }

  @Get('private')
  private() {
    return 'private';
  }
}
