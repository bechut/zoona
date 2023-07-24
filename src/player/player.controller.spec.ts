import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { prismaMock } from '../singleton';
import { mockProfile, mockUser } from '../data.mock';
import { CreatePlayerDto } from './player.dto';

describe('PlayerController', () => {
  let controller: PlayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
  });

  it('createPlayer fail: no User found', async () => {
    prismaMock.user.findUniqueOrThrow.mockRejectedValue('');
    const payload: CreatePlayerDto = {
      first_name: mockUser.profile.first_name,
      last_name: mockUser.profile.last_name,
      gender: mockUser.profile.gender,
      user_id: mockUser.id,
    };

    prismaMock.user.create.mockResolvedValue(mockUser);
    try {
      await controller.createPlayer(payload);
    } catch (e) {
      expect(e.message).toBe('Bad Request');
    }
  });

  it('createPlayer fail: transaction fail', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(mockUser);
    prismaMock.$transaction.mockRejectedValue(() => false);
    const payload: CreatePlayerDto = {
      first_name: mockUser.profile.first_name,
      last_name: mockUser.profile.last_name,
      gender: mockUser.profile.gender,
      user_id: mockUser.id,
    };
    try {
      await controller.createPlayer(payload);
    } catch (e) {
      expect(e.message).toBe('Bad Request');
    }
  });

  it('createPlayer success', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(mockUser);
    prismaMock.$transaction.mockResolvedValue(() => true);
    const payload: CreatePlayerDto = {
      first_name: mockUser.profile.first_name,
      last_name: mockUser.profile.last_name,
      gender: mockUser.profile.gender,
      user_id: mockUser.id,
    };
    const res = await controller.createPlayer(payload);
    expect(res).toBe('Player successfully created');
  });
});
