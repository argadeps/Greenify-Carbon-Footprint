import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface EmissionFactorAttributes {
    id: number;
    activity_id: string;
    category: string;
    displayname: string;
    source: string;
    region: string;
    year: number;
    source_lca_activity: string;
    data_version: string;
    created_at: number;
}

interface EmissionFactorCreationAttributes extends Optional<EmissionFactorAttributes, 'id'> { }

export class EmissionFactor extends Model<EmissionFactorAttributes, EmissionFactorCreationAttributes> implements EmissionFactorAttributes {
    public id!: number;
    public activity_id!: string;
    public category!: string;
    public displayname!: string;
    public source!: string;
    public region!: string;
    public year!: number;
    public source_lca_activity!: string;
    public data_version!: string;
    public created_at!: number;
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
            displayname: {
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
                type: DataTypes.TIME,
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