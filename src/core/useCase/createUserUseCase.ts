import { User } from "../entity/User";
import { UserRepositoryInterface } from "../repository/UserRepositoryInterface";
import { CreateUserRequestDTO } from "./createUserRequestDTO";

export class CreateUserUseCase {
    constructor(
        private userRepository: UserRepositoryInterface
    ) { }
    async execute(data: CreateUserRequestDTO): Promise<void> {
        const { email } = data;
        const userAlreadyExists = await this.userRepository.findByEmail(email);
        if(userAlreadyExists) {
            throw new Error('User already exists');
        }
        const user: User = new User(data);
        await this.userRepository.save(user);
    }
}