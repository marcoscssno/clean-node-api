import { User } from "../../entity/user/User";
import { UserRepositoryInterface } from "../../repository/user/UserRepositoryInterface";

export class GetAllUsersUseCase {
    constructor(
        private userRepository: UserRepositoryInterface
    ) { }
    async execute(): Promise<User[] | []> {
        const users = await this.userRepository.getAllUsers();
        if (users.length > 0) {
            return users;
        }
        return []
    }
}