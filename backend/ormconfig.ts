// ormconfig.ts

import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres', // Especifica o tipo do banco de dados
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'pass',
  database: process.env.DB_NAME || 'mydatabase',
  synchronize: true, // Tenha cuidado com esta opção em produção
  logging: false,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
};

export default config;

