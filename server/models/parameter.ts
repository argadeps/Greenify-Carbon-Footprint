import { DataTypes, Sequelize, Model, Optional, ForeignKey } from 'sequelize';
import { EmissionFactor } from './emissionFactor.js';
//import { User } from './user.js';

interface ParameterAttributes {
    id: number;
    parameter_name: string;
    value: string;
    value_type: string;
    emission_factor_id: number
    user_id: number;
    createdAt?: Date
    updatedAt?: Date; 
}

interface ParameterCreationAttributes extends Optional<ParameterAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class Parameter extends Model<ParameterAttributes, ParameterCreationAttributes> implements ParameterAttributes {
    public id!: number;
    public parameter_name!: string;
    public value!: string;
    public value_type!: string;
    public emission_factor_id!: ForeignKey<number>;  // Using ForeignKey type to explicitly show this is a foreign key
    public user_id!: ForeignKey<number>;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
                allowNull: false,
            },
            value: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            value_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            emission_factor_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'emissionfactors',  // References the table name
                    key: 'id',                 // References the column name in the emissionfactors table
                },
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                // You can add references to user table here if needed
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: 'parameters',
            sequelize,
            freezeTableName: true,
        }
    );

    // Define the associations
    Parameter.belongsTo(EmissionFactor, {
        foreignKey: 'emission_factor_id',
        // The onDelete and onUpdate behaviors will be inherited from the database constraints
    });

    EmissionFactor.hasMany(Parameter, {
        foreignKey: 'emission_factor_id',
        as: 'emissionParameters',
        onDelete: 'CASCADE',    // If an EmissionFactor is deleted, delete associated Parameters
        onUpdate: 'CASCADE',    // If an EmissionFactor's ID changes, update the reference
    });

    return Parameter;
}