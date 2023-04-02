import { Column, DataType, Model, Table } from "sequelize-typescript";

interface TextBlockCreationAttrs {
    uniqueTitle: string;
    title: string;
    content: string;
    image: string;
    group: string;
}

@Table({tableName: 'text_blocks'})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    uniqueTitle: string;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.TEXT, allowNull: false})
    content: string;

    @Column({type: DataType.STRING})
    image: string;

    @Column({type: DataType.STRING, allowNull: false})
    group: string;

}