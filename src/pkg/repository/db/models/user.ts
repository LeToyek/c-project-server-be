import { DataTypes, Model, Optional } from "sequelize";

type UserAttributes = {
    id: string;
    email: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: string;
    declare email: string;
    declare password: string;
    declare created_at: Date;
    declare updated_at: Date;
}

export const initUser = (sequelize: any) => {
    console.log("init user");
    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4 ,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
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


