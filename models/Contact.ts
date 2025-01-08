import { DataTypes } from 'sequelize';
import sequelize from '../config/db'; // Adjust the path as needed

// Define the Contact model
const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'Contacts', // Define the table name
  timestamps: true,      // Automatically add `createdAt` and `updatedAt`
});

export default Contact;
