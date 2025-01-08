import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'; // Load environment variables

dotenv.config(); // Initialize dotenv

// Initialize Sequelize with the connection URL from your environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // For Neon or similar services
    },
  },
});

export default sequelize;
