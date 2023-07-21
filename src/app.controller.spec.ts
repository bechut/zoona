import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { prismaMock } from './singleton';
import { mockHash, mockUuid } from './data.mock';

jest.mock('bcrypt', () => ({ hash: () => mockHash, genSalt: () => 10 }));
jest.mock('uuid', () => ({ v4: () => mockUuid }));

jest.mock('bcrypt', () => ({ hash: () => mockHash, genSalt: () => 10 }));
jest.mock('uuid', () => ({ v4: () => mockUuid }));

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('prismaUsage', async () => {
      const findUniqueOrThrow = { id: '1' };
      const findMany = [{ id: '1' }];

      prismaMock.test.findMany.mockResolvedValue(findMany);
      prismaMock.test.findUniqueOrThrow.mockResolvedValue(findUniqueOrThrow);

      expect(await appController.prismaUsage()).toEqual({
        findUniqueOrThrow,
        findMany,
      });
    });

    it('packages', async () => {
      const query = { test: '' };

      expect(appController.public()).toBe('public');
      expect(appController.private()).toBe('private');
      expect(await appController.packages(query)).toEqual({
        uuid: mockUuid,
        bcrypt_password: mockHash,
        query,
      });
    });
  });
});
