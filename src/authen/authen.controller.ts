import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { LoginDto } from './authen.dto';
import prisma from '../client';
import { compare } from 'bcrypt';
import { v4 } from 'uuid';
import * as moment from 'moment';

@Controller('auth')
export class AuthenController {
  @Post('login')
  async Login(@Body() body: LoginDto) {
    const user = await prisma.user
      .findUniqueOrThrow({
        where: { email: body.email },
      })
      .catch((e) => {
        throw new NotFoundException(e.message);
      });

    if (!(await compare(body.password, user.password))) {
      throw new BadRequestException('Password does not match');
    } else if (!user.status)
      throw new BadRequestException('User does not activated');

    const otp = v4().slice(0, 6);

    await prisma.otp.create({
      data: {
        value: otp,
        expiredAt: moment().add(1, 'day'),
        user_id: user.id,
      },
    });
    // pending jwt, moment

    const access_token = 'access_token';

    return { access_token };
  }
}
