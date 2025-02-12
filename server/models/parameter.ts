import { DataTypes, Sequelize, Model, Optional, ForeignKey } from 'sequelize';
import { EmissionFactor } from './emissionFactor';
import { User } from './user';

interface ParameterAttributes {
    id: number;
    parameter_name: string;
    display_name: string;
    user_id: string;
}

interface ParameterCreationAttributes extends Optional<ParameterAttributes, 'id'> { }

export class Parameter extends Model<ParameterAttributes, ParameterCreationAttributes> implements ParameterAttributes {
    public id!: number;
    public parameter_name!: string;
    public display_name!: ForeignKey<string>;
    public user_id!: ForeignKey<string>;
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
            display_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_id: {
                type: DataTypes.STRING,
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
    Parameter.belongsTo(User, {foreignKey: 'user_id'});
    User.hasMany(Parameter, {foreignKey: 'user_id'});

    return Parameter;
}