import { GetUserByIdUseCase } from "./getUserByIdUseCase"
import { inMemoryUserRepository } from "../../repository/user/implementation/InMemoryUserRepository";
import { GetUserByIdController } from "./getUserByIdController";

const getUserByIdUseCase = new GetUserByIdUseCase(
    inMemoryUserRepository
);

const getUserByIdController = new GetUserByIdController(
    getUserByIdUseCase
);

export {
    getUserByIdUseCase,
    getUserByIdController
};
