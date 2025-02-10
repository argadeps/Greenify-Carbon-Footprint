import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface ParameterAttributes {
    id: number;
    parameter_name: string;
    display_name: string;
}

interface ParameterCreationAttributes extends Optional<ParameterAttributes, 'id'> { }

export class Parameter extends Model<ParameterAttributes, ParameterCreationAttributes> implements ParameterAttributes {
    public id!: number;
    public parameter_name!: string;
    public display_name!: string;
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
            }
        },
        {
            tableName: 'parameters',
            sequelize,
            freezeTableName: true
        }
    );

    return Parameter;
}