import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

const test = {
  master: [1],
  authen: [1],
  setup: [1,2],
  user: [1,2,3],
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
