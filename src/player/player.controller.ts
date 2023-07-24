import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { CreatePlayerDto } from './player.dto';
import { v4 } from 'uuid';
import prisma from '../client';

@Controller('player')
export class PlayerController {
  @Post()
  async createPlayer(@Body() body: CreatePlayerDto) {
    const user = await prisma.user
      .findUniqueOrThrow({
        where: { id: body.user_id },
      })
      .catch((e) => {
        throw new BadRequestException(e.message);
      });

    const player_id = v4();
    await prisma
      .$transaction([
        prisma.player.create({
          data: {
            id: player_id,
            parent_id: user.id,
          },
        }),
        prisma.profile.create({
          data: {
            player_id,
            first_name: body.first_name,
            last_name: body.last_name,
            gender: body.gender,
          },
        }),
      ])
      .catch((e) => {
        throw new BadRequestException(e.message);
      });

    return 'Player successfully created';
  }
}
