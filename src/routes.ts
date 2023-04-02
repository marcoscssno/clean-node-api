import { Router } from "express";
import { createUserController } from "./core/useCase/createUser";
import { getAllUsersController } from "./core/useCase/getAllUsers";
import { getUserByIdController } from "./core/useCase/getUserById";
import { updateUserController } from "./core/useCase/updateUser";

const router = Router()

router.post('/users', (request, response) => {
    return createUserController.handle(request, response);
});

router.get('/users', async (request, response) => {
    return getAllUsersController.handle(request, response);
});

router.get('/user/:id', async (request, response) => {
    return getUserByIdController.handle(request, response);
});

router.put('/user/:id', async (request, response) => {
    return updateUserController.handle(request, response);
});

export { router }
