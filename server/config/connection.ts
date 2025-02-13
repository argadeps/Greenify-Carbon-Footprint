import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || 'greenify_db',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || '&p#m64SA',
      {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

export default sequelize;