import { mockAccessToken, mockUser } from './../data.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthenController } from './authen.controller';
import { mockHash, mockUuid } from '../data.mock';
import { prismaMock } from '../singleton';
import { LoginDto } from './authen.dto';
import { JwtModule } from '../packages/jwt/jwt.module';
import { JwtService } from '../packages/jwt/jwt.service';

jest.mock('bcrypt', () => ({
  hash: () => mockHash,
  genSalt: () => 10,
  compare: (a) => a === mockUser.password,
}));
jest.mock('uuid', () => ({ v4: () => mockUuid }));

describe('AuthenController', () => {
  let controller: AuthenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [AuthenController],
      providers: [
        {
          provide: JwtService,
          useValue: { get: () => ({ sign: () => mockAccessToken }) },
        },
      ],
    }).compile();

    controller = module.get<AuthenController>(AuthenController);
  });

  describe('Login', () => {
    const payload: LoginDto = {
      email: mockUser.email,
      password: mockUser.password,
    };
    it('No User found', async () => {
      prismaMock.user.findUniqueOrThrow.mockRejectedValue({
        message: 'No User found',
      });
      try {
        await controller.Login(payload);
      } catch (e) {
        expect(e.message).toBe('No User found');
      }
    });

    it('Password does not match', async () => {
      prismaMock.user.findUniqueOrThrow.mockResolvedValue({
        ...mockUser,
      });

      const p = {
        ...payload,
        password: '',
      };

      try {
        await controller.Login(p);
      } catch (e) {
        expect(e.message).toBe('Password does not match');
      }
    });

    it('User does not activated', async () => {
      prismaMock.user.findUniqueOrThrow.mockResolvedValue({
        ...mockUser,
        status: false,
      });

      try {
        await controller.Login(payload);
      } catch (e) {
        expect(e.message).toBe('User does not activated');
      }
    });

    it('Success', async () => {
      prismaMock.user.findUniqueOrThrow.mockResolvedValue({
        ...mockUser,
      });
      const res = await controller.Login(payload);
      expect(res).toEqual({
        access_token: mockAccessToken,
      });
    });
  });
});
