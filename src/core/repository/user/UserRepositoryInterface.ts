import { User } from '../../entity/user/User'

export interface UserRepositoryInterface {
    findByEmail(email: string): Promise<User | undefined>;
    save(user: User): Promise<void>;
    getAllUsers(): Promise<User[] | []>;
    getUserById(id: string): Promise<User | null>;
    update(id: string, user: User): Promise<void>;
    delete(id: string): Promise<void>;
}
