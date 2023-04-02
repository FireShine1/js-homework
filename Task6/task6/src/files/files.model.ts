import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ResourceCreationAttrs {
    name: string;
    essenceTable: string;
    essenceId: number;
    created: number;
}

@Table({tableName: 'resources', timestamps: false})
export class Resource extends Model<Resource, ResourceCreationAttrs> {

    @Column({type: DataType.STRING, unique: true, primaryKey: true})
    name: string;

    @Column({type: DataType.STRING})
    essenceTable: string;

    @Column({type: DataType.INTEGER})
    essenceId: number;

    @Column({type: DataType.BIGINT, allowNull: false})
    created: number;

}