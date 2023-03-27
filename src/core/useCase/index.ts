import { CreateUserUseCase } from "./createUser"
import { InMemoryUserRepository } from "../repository/implementation/InMemoryUserRepository";
import { CreateUserController } from "./createUserController";

const userRepository = new InMemoryUserRepository();

const createUserUseCase = new CreateUserUseCase(
    userRepository
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export {
    createUserUseCase,
    createUserController
};