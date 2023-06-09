import { User } from "../../../entity/user/User";
import { UserRepositoryInterface } from "../UserRepositoryInterface";

class InMemoryUserRepository implements UserRepositoryInterface {
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

    async getUserById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.getId() === id);
        return user || null;
    }

    async update(id: string, user: User): Promise<void> {
        const targetUser = this.users.find(user => user.getId() === id);
        if(targetUser) {
            targetUser?.setName(user.getName());
            targetUser?.setEmail(user.getEmail());
            targetUser?.setEncryptedPassword(user.getEncryptedPassword());
        }
    }

    async delete(id: string): Promise<void> {
        const targetUser = user => user.getId() === id;
        const targetUserIndex = this.users.findIndex(targetUser);
        const targetUserExists = targetUserIndex >= 0;
        if(targetUserExists) {
            this.users.splice(targetUserIndex, 1);
        }
    }
}

// Create a single instance of this repository for testing the API
// Otherwise, it's data won't be available for different use cases.
const inMemoryUserRepository = new InMemoryUserRepository();

export {
    InMemoryUserRepository,
    inMemoryUserRepository
}