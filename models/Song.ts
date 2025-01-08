import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

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
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'Songs', 
  timestamps: true,   
});

export default Song;
