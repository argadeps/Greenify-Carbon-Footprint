import { DataTypes, Sequelize, Model, Optional, ForeignKey } from 'sequelize';
import { EmissionFactor } from './emissionFactor.js';
import { User } from './user.js';

interface ParameterAttributes {
    id: number;
    parameter_name: string;
    value: string;
    value_type: string;
    display_name: string;
    user_id: number;
}

interface ParameterCreationAttributes extends Optional<ParameterAttributes, 'id'> { }

export class Parameter extends Model<ParameterAttributes, ParameterCreationAttributes> implements ParameterAttributes {
    public id!: number;
    public parameter_name!: string;
    value!: string;
    value_type!: string;
    public display_name!: ForeignKey<string>;
    public user_id!: ForeignKey<number>;
}

export function ParameterFactory(sequelize: Sequelize): typeof Parameter {
    Parameter.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            parameter_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            value: {
                type: DataTypes.STRING,
                allowNull: false
            },
            value_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            display_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'parameters',
            sequelize,
            freezeTableName: true
        }
    );

    Parameter.belongsTo(EmissionFactor, {foreignKey: 'display_name'});
    EmissionFactor.hasMany(Parameter, {foreignKey: 'display_name'});
    //Parameter.belongsTo(User, {foreignKey: 'user_id'});
    User.hasMany(Parameter, {foreignKey: 'user_id'});

    return Parameter;
}