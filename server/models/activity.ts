import { DataTypes, Sequelize, Model, Optional, ForeignKey } from 'sequelize';
import { User } from './user.js';
import { EmissionFactor } from './emissionFactor.js'

interface ActivityAttributes {
    id: number;
    user_id: number;
    display_name: string;
    type: string;
    category: string;
    carbon_impact: number;
    water_impact: number;
    waste_impact: number;
    date: Date;
    description: string;
}

interface ActivityCreationAttributes extends Optional<ActivityAttributes, 'id'> { }

export class Activity extends Model<ActivityAttributes, ActivityCreationAttributes> implements ActivityAttributes {
    public id!: number;
    public user_id!: ForeignKey<number>;
    public emission_factor_id!: ForeignKey<number>;
    public type!: string;
    public category!: string;
    public carbon_impact!: number;
    public water_impact!: number;
    public waste_impact!: number;
    public date!: Date;
    public description!: string;
    public display_name!: string;
}

export function ActivityFactory(sequelize: Sequelize): typeof Activity {
    Activity.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            display_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false
            },
            carbon_impact: {
                type: DataTypes.DECIMAL,
                allowNull: true
            },
            water_impact: {
                type: DataTypes.DECIMAL,
                allowNull: true
            },
            waste_impact: {
                type: DataTypes.DECIMAL,
                allowNull: true
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            tableName: 'activities',
            sequelize,
            freezeTableName: true
        }
    );

    Activity.belongsTo(User, {foreignKey: 'user_id'});
    User.hasMany(Activity,{foreignKey: 'user_id', as: 'userActivities', onDelete: 'CASCADE', onUpdate: 'CASCADE'});

    Activity.belongsTo(EmissionFactor,{foreignKey: 'display_name'});
    EmissionFactor.hasMany(Activity, {foreignKey: 'display_name', as: 'emissionActivities', onDelete: 'CASCADE', onUpdate: 'CASCADE'})

    return Activity;
}