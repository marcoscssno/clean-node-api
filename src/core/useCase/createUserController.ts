import { Request, Response } from 'express';
import { CreateUserUseCase } from "./createUserUseCase";


export class CreateUserController {
    constructor(
        private createUserUseCase: CreateUserUseCase
    ) {}
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, encryptedPassword } = request.body;

        try {
            await this.createUserUseCase.execute({
                name,
                email,
                encryptedPassword
            })

            return response.status(201).send();
        }
        catch(error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error'
            });
        }
    }
}