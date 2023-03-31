import { User } from "../../entity/user/User";
import { UserRepositoryInterface } from "../../repository/user/UserRepositoryInterface";

class GetUserByIdUseCase {
    private userRepository: UserRepositoryInterface;

    async execute(id: string): Promise<User | null> {
        if(!id) {
            throw new Error('Id was not specified');
        }
        return null;
    }
}

export {
    GetUserByIdUseCase
}