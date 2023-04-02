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
        if(!id) {
            throw new Error('Id was not specified');
        }
        if(typeof(id) !== 'string') {
            throw new Error('Invalid id type');
        }
        if(!user) {
            throw new Error('User was not specified');
        }
        if(typeof(user) !== 'object') {
            throw new Error('Invalid user type');
        }
        const targetUser = this.users.find(user => user.getId() === id);
        if(!targetUser) {
            throw new Error('User was not found');
        }
        targetUser?.setName(user.getName());
        targetUser?.setEmail(user.getEmail());
        targetUser?.setEncryptedPassword(user.getEncryptedPassword());
    }
}

// Create a single instance of this repository for testing the API
// Otherwise, it's data won't be available for different use cases.
const inMemoryUserRepository = new InMemoryUserRepository();

export {
    InMemoryUserRepository,
    inMemoryUserRepository
}