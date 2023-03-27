import { Router } from "express";
import { createUserController } from "./core/useCase/createUserController";

const router = Router()

router.post('/users', (request, response) => {
    return createUserController.handle(request, response);
});

export { router }
