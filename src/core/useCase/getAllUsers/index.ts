import { GetAllUsersUseCase } from "./getAllUsersUseCase"
import { inMemoryUserRepository } from "../../repository/user/implementation/InMemoryUserRepository";
import { GetAllUsersController } from "./getAllUsersController";

const getAllUsersUseCase = new GetAllUsersUseCase(
    inMemoryUserRepository
);

const getAllUsersController = new GetAllUsersController(
    getAllUsersUseCase
);

export {
    getAllUsersUseCase,
    getAllUsersController
};
