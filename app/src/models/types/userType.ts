type CreateUser = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type GetUser = {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export { CreateUser, GetUser };
