import { GENDERS } from '@prisma/client';

export const mockUuid = 'uuid';
export const mockHash = 'mockHash';
export const mockAccessToken = 'access_token';
export const userId = 'a4c46220-7e97-4905-b4fe-86d393befb9f';

export const mockProfile = {
  id: '',
  first_name: 'first_name',
  last_name: 'last_name',
  gender: GENDERS.Female,
  age: 20,
  bio: '',
  user_id: userId,
};

export const mockUser = {
  id: userId,
  email: 'a1@gmail.com',
  password: '$2b$10$SuvrlS6ooy7mkOL9fr5aPOQl2Nt6GoNnyZM8DdHseeJMIm47FXh.K',
  status: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  profile: mockProfile,
};
