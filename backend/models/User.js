const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeInstance'); 

class User extends Model {}

User.init({
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    allowNull: false,
    defaultValue: 'user',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false, // Disable Sequelize's automatic timestamps
  underscored: true,
  hooks: {
    beforeUpdate: (user) => {
      user.updated_at = new Date();
    }
  }
});

module.exports = User;