import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db'; // Ensure this path is correct

// Define an interface for the attributes of the Song model
interface SongAttributes {
  id: number; // Primary key
  title: string;
  lyrics: Text;
}

// Define an interface for optional attributes during creation
interface SongCreationAttributes extends Optional<SongAttributes, 'id'> {}

// Extend Sequelize's Model class
class Song extends Model<SongAttributes, SongCreationAttributes> implements SongAttributes {
  public id!: number; // Non-null assertion for required fields
  public title!: string;
  public lyrics!: Text;

  // Add timestamps fields if using Sequelize's default timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the model with Sequelize
Song.init(
  {
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
      type: DataTypes.TEXT, // Using TEXT for potentially longer lyrics
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the database connection instance
    modelName: 'Song', // Name of the model
    tableName: 'Songs', // Table name in the database
    timestamps: true, // Enable `createdAt` and `updatedAt`
  }
);

export default Song;
