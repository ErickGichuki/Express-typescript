import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db'; // Adjust the path accordingly

// Define an interface for the attributes of the User model
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

// Define an interface for optional attributes during creation
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'member',
    },
  },
  {
    sequelize, // Pass the database connection instance
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
  }
);

export default User;
