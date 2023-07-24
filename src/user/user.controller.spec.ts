import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { mockHash, mockProfile, mockUser, mockUuid } from '../data.mock';
import { prismaMock } from '../singleton';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { GENDERS } from '@prisma/client';

jest.mock('bcrypt', () => ({ hash: () => mockHash, genSalt: () => 10 }));
jest.mock('uuid', () => ({ v4: () => mockUuid }));

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('createUser fail', async () => {
    prismaMock.$transaction.mockRejectedValue(() => false);
    const payload: CreateUserDto = {
      email: mockUser.email,
      password: mockUser.password,
      first_name: mockUser.profile.first_name,
      last_name: mockUser.profile.last_name,
    };

    prismaMock.user.create.mockResolvedValue(mockUser);
    try {
      await controller.createUser(payload);
    } catch (e) {
      expect(e.message).toBe('Bad Request');
    }
  });

  it('createUser success', async () => {
    prismaMock.$transaction.mockResolvedValue(() => true);
    const payload: CreateUserDto = {
      email: mockUser.email,
      password: mockUser.password,
      first_name: mockUser.profile.first_name,
      last_name: mockUser.profile.last_name,
    };

    prismaMock.user.create.mockResolvedValue(mockUser);
    const res = await controller.createUser(payload);
    expect(res).toBe('User successfully created');
  });

  it('userDetail fail', async () => {
    prismaMock.user.findUniqueOrThrow.mockRejectedValue('');
    try {
      await controller.userDetail(mockUser.id);
    } catch (e) {
      expect(e.message).toBe('Bad Request');
    }
  });

  it('userDetail success', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(mockUser);
    const res = await controller.userDetail(mockUser.id);
    expect(res).toEqual(mockUser);
  });

  it('userUpdate fail: user not found', async () => {
    prismaMock.user.findUniqueOrThrow.mockRejectedValue('');
    const payload: UpdateUserDto = {
      first_name: mockProfile.first_name,
      last_name: mockProfile.last_name,
      gender: GENDERS.Female,
      bio: '',
    };

    try {
      await controller.userUpdate(mockUser.id, payload);
    } catch (e) {
      expect(e.message).toBe('Bad Request');
    }
  });

  it('userUpdate fail: profile save error', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(mockUser);
    prismaMock.profile.update.mockRejectedValue('');
    const payload: UpdateUserDto = {
      first_name: mockProfile.first_name,
      last_name: mockProfile.last_name,
      gender: GENDERS.Female,
      bio: '',
    };

    try {
      await controller.userUpdate(mockUser.id, payload);
    } catch (e) {
      expect(e.message).toBe('Bad Request');
    }
  });

  it('userUpdate fail: user save error', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(mockUser);
    prismaMock.profile.update.mockResolvedValue(mockProfile);
    prismaMock.user.update.mockRejectedValue('');
    const payload: UpdateUserDto = {
      first_name: mockProfile.first_name,
      last_name: mockProfile.last_name,
      gender: GENDERS.Female,
      bio: '',
    };

    try {
      await controller.userUpdate(mockUser.id, payload);
    } catch (e) {
      expect(e.message).toBe('Bad Request');
    }
  });

  it('userUpdate success', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(mockUser);
    prismaMock.profile.update.mockResolvedValue(mockProfile);
    prismaMock.user.update.mockResolvedValue(mockUser);
    const payload: UpdateUserDto = {
      first_name: mockProfile.first_name,
      last_name: mockProfile.last_name,
      gender: GENDERS.Female,
      bio: '',
    };

    const user = await controller.userUpdate(mockUser.id, payload);
    expect(user).toEqual(mockUser);
  });
});
