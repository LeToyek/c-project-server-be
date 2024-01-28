import { Sequelize } from "sequelize";
import { User } from "./db/models/user";

export interface UserRepository {
    getUserById(id: string): Promise<User | null>;
    getUserByEmailandPassword(email: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
}

export class UserRepositoryImpl implements UserRepository {
    constructor(private db: Sequelize) { }

    createUser = async (user: User): Promise<User> => {
        return User.create({
            email: user.email,
            password: user.password,
        });
    }

    getAllUser = async (): Promise<User[]> => {
        return await User.findAll();
    }

    getUserById = async (id: string): Promise<User | null> => {
        return User.findOne({ where: { id: id } });
    }

    getUserByEmailandPassword = async (email: string): Promise<User | null> => {
        return await User.findOne({ where: { email: email } });
    }
}