import { Injectable } from '@nestjs/common';
import { PrismaClient as HappyZooClient } from '../../../prisma/client/happyzoo';

@Injectable()
export class PrismaClientService {
  private happyZooClient = new HappyZooClient();

  happyZoo() {
    return this.happyZooClient;
  }
}
