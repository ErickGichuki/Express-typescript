import { DataTypes } from 'sequelize';
import sequelize from '../config/db'; // Adjust the path as needed

// Define the Song model
const Song = sequelize.define('Song', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lyrics: {
    type: DataTypes.TEXT, // For potentially longer lyrics
    allowNull: false,
  },
}, {
  tableName: 'Songs', // Define the table name
  timestamps: true,    // Automatically add `createdAt` and `updatedAt`
});

export default Song;
