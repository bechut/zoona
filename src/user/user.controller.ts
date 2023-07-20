import { Body, Controller, Post } from '@nestjs/common';
import prisma from '../client';
import { v4 } from 'uuid';
import { CreateUserDto } from './user.dto';
import { hash, genSalt } from 'bcrypt';

@Controller('user')
export class UserController {
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const user_id = v4();
    await prisma.$transaction([
      prisma.user.create({
        data: {
          email: body.email,
          password: await hash(body.password, await genSalt(10)),
        },
      }),
      prisma.profile.create({
        data: {
          user_id,
          first_name: body.first_name,
          last_name: body.last_name,
        },
      }),
    ]);

    return 'User successfully created';
  }
}
