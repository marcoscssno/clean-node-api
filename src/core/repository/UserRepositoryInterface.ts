import { User } from '../entity/User'

export interface UserRepositoryInterface {
    findByEmail(email: string): Promise<User | undefined>;
    save(user: User): Promise<void>;
    getAllUsers(): Promise<User[] | []>;
}