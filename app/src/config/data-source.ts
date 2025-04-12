import { DataSource } from 'typeorm';
import { postgres } from './config';
import { User } from '../models/entities/User';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: postgres.pgUrl,
  entities: [User],
  synchronize: true,
  // migrations: ["../database/migrations/*.{ts,js}"],
  // logging: ['query']
});

export default AppDataSource;
