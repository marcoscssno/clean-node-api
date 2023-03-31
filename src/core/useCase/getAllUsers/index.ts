import { GetAllUsersUseCase } from "./getAllUsersUseCase"
import { InMemoryUserRepository } from "../../repository/user/implementation/InMemoryUserRepository";
import { GetAllUsersController } from "./getAllUsersController";

const userRepository = new InMemoryUserRepository();

const getAllUsersUseCase = new GetAllUsersUseCase(
    userRepository
);

const getAllUsersController = new GetAllUsersController(
    getAllUsersUseCase
);

export {
    getAllUsersUseCase,
    getAllUsersController
};
