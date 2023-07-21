import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import prisma from '../client';
import { v4 } from 'uuid';
import { CreateUserDto } from './user.dto';
import { hash, genSalt } from 'bcrypt';
import { Public } from '../decorators/public.decorator';

@Controller('user')
export class UserController {
  @Public()
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const user_id = v4();
    await prisma
      .$transaction([
        prisma.user.create({
          data: {
            id: user_id,
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
      ])
      .catch((e) => {
        throw new BadRequestException(e.message);
      });

    return 'User successfully created';
  }
}
