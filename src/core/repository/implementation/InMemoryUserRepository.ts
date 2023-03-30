import { User } from "../../entity/User";
import { UserRepositoryInterface } from "../UserRepositoryInterface";

export class InMemoryUserRepository implements UserRepositoryInterface {
    private users: User[] = [];
    constructor() { }
    async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(user => user.getEmail() === email);
        return user;
    }
    async save(user: User): Promise<void> {
        this.users.push(user);
    }

    async getAllUsers(): Promise<User[] | []> {
        return this.users;
    }
}
