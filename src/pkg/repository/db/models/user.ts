import { DataTypes, Model, Optional } from "sequelize";

type UserAttributes = {
    id: number;
    email: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: number;
    declare email: string;
    declare password: string;
    declare created_at: Date;
    declare updated_at: Date;
}

export const initUser = (sequelize: any) => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        tableName: "users",
        sequelize: sequelize,
    });
}


