import { Controller, Get } from '@nestjs/common';
import prisma from './client';
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
}
