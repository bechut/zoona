export const UserSelect = {
  id: true,
  email: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  Profile: {
    select: {
      id: true,
      first_name: true,
      last_name: true,
      gender: true,
      age: true,
      bio: true,
    },
  },
};
