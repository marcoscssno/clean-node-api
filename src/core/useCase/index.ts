import { CreateUserUseCase } from "./createUserUseCase"
import { InMemoryUserRepository } from "../repository/implementation/InMemoryUserRepository";
import { CreateUserController } from "./createUserController";
import { PasswordEncryptorInterface } from "../lib/passwordEncryptor/PasswordEncryptorInterface";
import { BcryptPasswordEncryptor } from "../lib/passwordEncryptor/BcryptPasswordEncryptor";

const userRepository = new InMemoryUserRepository();
const passwordEncryptor: PasswordEncryptorInterface = new BcryptPasswordEncryptor();

const createUserUseCase = new CreateUserUseCase(
    userRepository,
    passwordEncryptor
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export {
    createUserUseCase,
    createUserController
};
