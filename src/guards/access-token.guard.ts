import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '../packages/jwt/jwt.service';
import prisma from 'src/client';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const Public = this.reflector.get<string[]>('Public', context.getHandler());
    if (Public) {
      return true;
    }
    const request: any = context.switchToHttp().getRequest();
    const bearer = request.headers.authorization?.split(' ')[1];
    try {
      this.jwtService.get().verify(bearer);
    } catch (e) {
      throw new UnauthorizedException();
    }
    const decode: any = this.jwtService.get().decode(bearer);
    const otp = await prisma.otp.findFirstOrThrow({
      where: { value: decode.token as string },
    });
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: otp.user_id },
    });
    request.user = user;
    return true;
  }
}
