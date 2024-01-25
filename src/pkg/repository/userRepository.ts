import { Sequelize } from "sequelize";
import { User } from "./db/models/user";

export interface UserRepository{
    getUserById(id: string): Promise<User | null>;
    getUserByEmailandPassword(email: string, password: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    
}

export class UserRepositoryImpl implements UserRepository{
    constructor(private db: Sequelize){}

    public async createUser(user: User): Promise<User> {
        try {
            return User.create(user);
        } catch (error) {
            throw error;
        }
    }

    public async getAllUser(): Promise<User[]>{
        try {
            return await User.findAll();
        } catch (error) {
            throw error;
        }
    }

    public async getUserById(id: string): Promise<User | null>{
        try {
            return await User.findOne({ where: { id: id } });
        } catch (error) {
            throw error;
        }
    }

    public async getUserByEmailandPassword(email: string, password: string): Promise<User | null>{
        try {
            return await User.findOne({ where: { email: email, password: password } });
        } catch (error) {
            throw new Error("Error => "+error);
        }
    }
}