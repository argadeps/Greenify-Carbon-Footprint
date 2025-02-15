import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface EmissionFactorAttributes {
    id: number;
    activity_id: string;
    category: string;
    display_name: string;
    source: string;
    region: string;
    year: number;
    source_lca_activity: string;
    data_version: string;
    created_at: Date;
}

interface EmissionFactorCreationAttributes extends Optional<EmissionFactorAttributes, 'id'> { }

export class EmissionFactor extends Model<EmissionFactorAttributes, EmissionFactorCreationAttributes> implements EmissionFactorAttributes {
    public id!: number;
    public activity_id!: string;
    public category!: string;
    public display_name!: string;
    public source!: string;
    public region!: string;
    public year!: number;
    public source_lca_activity!: string;
    public data_version!: string;
    public created_at!: Date;
}

export function EmissionFactorFactory(sequelize: Sequelize): typeof EmissionFactor {
    EmissionFactor.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            activity_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false
            },
            display_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            source: {
                type: DataTypes.STRING,
                allowNull: false
            },
            region: {
                type: DataTypes.STRING,
                allowNull: false
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            source_lca_activity: {
                type: DataTypes.STRING,
                allowNull: false
            },
            data_version: {
                type: DataTypes.STRING,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now')
            }
        },
        {
            tableName: 'emissionfactors',
            sequelize,
            freezeTableName: true
        }
    );

    return EmissionFactor;
}