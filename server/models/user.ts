import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    location: string;
    eco_score: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
   public id!: number;
   public username!: string;
   public email!: string;
   public password_hash!: string;
   public location!: string;
   public eco_score!: number;

   public readonly last_login!: Date;
   public readonly created_at!: Date;

   public async setPassword(password: string){
    const saltRounds = 10;
    this.password_hash = await bcrypt.hash(password, saltRounds);
   }
}

export function UserFactory(sequelize: Sequelize): typeof User {
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
              allowNull: false,
          },
          password_hash: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          location: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          eco_score: {
            type: DataTypes.NUMBER,
            allowNull: false
          }

      },
      {
        tableName: 'users',  // Name of the table in PostgreSQL
        sequelize,            // The Sequelize instance that connects to PostgreSQL
        freezeTableName: true,
        hooks: {
          // Before creating a new user, hash and set the password
          beforeCreate: async (user: User) => {
            await user.setPassword(user.password_hash);
          },
          // Before updating a user, hash and set the new password if it has changed
          beforeUpdate: async (user: User) => {
            if (user.changed('password_hash')) {
              await user.setPassword(user.password_hash);
            }
          },
        }
      }
    );
  
    return User;  // Return the initialized User model
  }
  