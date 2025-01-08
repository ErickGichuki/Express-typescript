import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db'; // Ensure correct path to your sequelize instance

// Define an interface for the attributes of the Contact model
interface ContactAttributes {
  id: number; // Primary key (if you have an auto-incrementing ID)
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Define an interface for optional attributes during creation (i.e., without `id`)
interface ContactCreationAttributes extends Optional<ContactAttributes, 'id'> {}

// Extend Sequelize's Model class to create the Contact class
class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
  public id!: number; // Non-null assertion for required fields
  public name!: string;
  public email!: string;
  public subject!: string;
  public message!: string;

  // Add timestamps fields if you use Sequelize's default timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the model with Sequelize
Contact.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
  },
  {
    sequelize, // Pass the database connection instance
    modelName: 'Contact', // Name of the model
    tableName: 'Contacts', // Table name in the database
    timestamps: true, // Enable `createdAt` and `updatedAt`
  }
);

export default Contact;
