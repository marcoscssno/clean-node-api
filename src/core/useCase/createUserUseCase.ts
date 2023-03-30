import { User } from "../entity/User";
import { UserProps } from "../entity/UserProps";
import { PasswordEncryptorInterface } from "../lib/passwordEncryptor/PasswordEncryptorInterface";
import { UserRepositoryInterface } from "../repository/UserRepositoryInterface";
import { CreateUserRequestDTO } from "./createUserRequestDTO";

export class CreateUserUseCase {
    constructor(
        private userRepository: UserRepositoryInterface,
        private passwordEncryptor: PasswordEncryptorInterface
    ) { }
    async execute(data: CreateUserRequestDTO): Promise<void> {
        const { name, email, password } = data;
        const userAlreadyExists = await this.userRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new Error('User already exists');
        }
        const encryptedPassword = await this.passwordEncryptor.execute(password);
        const userProps: UserProps = {
            name,
            email,
            encryptedPassword
        }
        const user: User = new User(userProps);
        await this.userRepository.save(user);
    }
}
