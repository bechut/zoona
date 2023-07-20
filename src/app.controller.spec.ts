import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { prismaMock } from './singleton';

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
  });
});
