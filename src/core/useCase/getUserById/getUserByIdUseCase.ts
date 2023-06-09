import { User } from "../../entity/user/User";
import { UserRepositoryInterface } from "../../repository/user/UserRepositoryInterface";

class GetUserByIdUseCase {
    constructor(
        private userRepository: UserRepositoryInterface
        ) { }

    async execute(id: string): Promise<User | null> {
        if(!this.userRepository) {
            throw new Error('Repository was not specified');
        }
        if(!id) {
            throw new Error('Id was not specified');
        }
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            return null
        }
        return user;
    }
}

export {
    GetUserByIdUseCase
}