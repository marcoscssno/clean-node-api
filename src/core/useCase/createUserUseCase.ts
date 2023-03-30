import { User } from "../entity/User";
import PasswordEncryptorInterface from "../lib/passwordEncryptor/PasswordEncryptorInterface";
import { UserRepositoryInterface } from "../repository/UserRepositoryInterface";
import { CreateUserRequestDTO } from "./createUserRequestDTO";

export class CreateUserUseCase {
    constructor(
        private userRepository: UserRepositoryInterface,
        private passwordEncryptor: PasswordEncryptorInterface
    ) { }
    async execute(data: CreateUserRequestDTO): Promise<void> {
        const { email } = data;
        const userAlreadyExists = await this.userRepository.findByEmail(email);
        if(userAlreadyExists) {
            throw new Error('User already exists');
        }
        const { encryptedPassword } = data;
        data.encryptedPassword = await this.passwordEncryptor.execute(encryptedPassword);
        const user: User = new User(data);
        await this.userRepository.save(user);
    }
}