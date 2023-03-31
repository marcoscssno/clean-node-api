import { CreateUserUseCase } from "./createUserUseCase"
import { inMemoryUserRepository } from "../../repository/user/implementation/InMemoryUserRepository";
import { CreateUserController } from "./createUserController";
import { PasswordEncryptorInterface } from "../../lib/passwordEncryptor/PasswordEncryptorInterface";
import { BcryptPasswordEncryptor } from "../../lib/passwordEncryptor/BcryptPasswordEncryptor";

const passwordEncryptor: PasswordEncryptorInterface = new BcryptPasswordEncryptor();

const createUserUseCase = new CreateUserUseCase(
    inMemoryUserRepository,
    passwordEncryptor
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export {
    createUserUseCase,
    createUserController
};
