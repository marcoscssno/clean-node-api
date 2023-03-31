import { Router } from "express";
import { createUserController } from "./core/useCase/createUser";
import { getAllUsersController } from "./core/useCase/getAllUsers";

const router = Router()

router.post('/users', (request, response) => {
    return createUserController.handle(request, response);
});

router.get('/users', async (request, response) => {
    return getAllUsersController.handle(request, response);
});

export { router }
