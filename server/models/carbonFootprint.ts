import { DataTypes, Sequelize, Model, Optional, ForeignKey } from 'sequelize';
import { User } from './user.js';

interface CarbonFootprintAttributes {
    id: number;
    user_id: number;
    transportation: number;
    home_energy: number;
    food: number;
    waste: number;
    water_usage: number;
    consumer_goods: number;
    services: number;
    date: Date;
    created_at: number;
}

interface CarbonFootprintCreationAttributes extends Optional<CarbonFootprintAttributes, 'id'> { }

export class CarbonFootprint extends Model<CarbonFootprintAttributes, CarbonFootprintCreationAttributes> implements CarbonFootprintAttributes {
    public id!: number;
    public user_id!: ForeignKey<number>;
    public transportation!: number;
    public home_energy!: number;
    public food!: number;
    public waste!: number;
    public water_usage!: number;
    public consumer_goods!: number;
    public services!: number;
    public date!: Date;
    public created_at!: number;
}

export function CarbonFootprintFactory(sequelize: Sequelize): typeof CarbonFootprint {
    CarbonFootprint.init(
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
            transportation: {
                type: DataTypes.DECIMAL,
                allowNull: true
            },
            home_energy: {
                type: DataTypes.DECIMAL,
                allowNull: true
            },
            food: {
                type: DataTypes.DECIMAL,
                allowNull: true
            },
            waste: {
                type: DataTypes.DECIMAL,
                allowNull: true
            },
            water_usage: {
                type: DataTypes.DECIMAL,
                allowNull: true
            },
            consumer_goods: {
                type: DataTypes.DECIMAL,
                allowNull: true
            },
            services: {
                type: DataTypes.DECIMAL,
                allowNull: true
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            created_at: {
                type: DataTypes.TIME,
                allowNull: false,
                defaultValue: Sequelize.fn('now')
            }
        },
        {
            tableName: 'CarbonFootprints',
            freezeTableName: true,
            sequelize
        }
    );
    CarbonFootprint.belongsTo(User,{foreignKey: 'user_id'});
    User.hasMany(CarbonFootprint, {foreignKey: 'user_id'});

    return CarbonFootprint;
}