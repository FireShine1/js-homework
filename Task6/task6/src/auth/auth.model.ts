import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import { Profile } from "src/profiles/profiles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @ForeignKey(() => Profile)
    @Column({type: DataType.INTEGER})
    profileId: number;

    @BelongsTo(() => Profile, {onDelete: 'CASCADE',  hooks:true})
    profile: Profile;

}