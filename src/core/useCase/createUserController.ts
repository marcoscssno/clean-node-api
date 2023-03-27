import { Request, Response } from 'express';
import { CreateUserUseCase } from "./createUser";


export class CreateUserController {
    constructor(
        private createUserUseCase = CreateUserUseCase
    ) {}
    async handle(request: Request, response: Response) {}
}