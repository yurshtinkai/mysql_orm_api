import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config(); 

import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost', 
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'lourd_mysql_orm_api',
    entities: [User],
    synchronize: true,
});