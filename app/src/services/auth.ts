import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config';
import { CreateUser, User } from '../models';
import { userService } from '.';

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async (user: CreateUser) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  const userCreated = userRepository.create(user);
  await userRepository.save(userCreated);
  return userService.formatUserInfo(userCreated);
};

export const authenticateUser = async (username: string, email: string, password: string) => {
  const user = !username
    ? await userRepository.findOneBy({ email })
    : await userRepository.findOneBy({ username });
  if (!user) throw new Error('Invalid credentials');
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');
  const token = jwt.sign(
    userService.formatUserInfo(user),
    process.env.JWT_SECRET || 'defaultSecret',
    {
      expiresIn: '6h'
    }
  );
  return { token };
};
