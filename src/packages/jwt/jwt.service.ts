import { Injectable } from '@nestjs/common';
import { JwtService as Js } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jS: Js) {}

  get() {
    return this.jS;
  }
}
