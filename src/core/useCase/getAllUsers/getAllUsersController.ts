import { Request, Response } from 'express';
import { BcryptPasswordEncryptor } from '../../lib/passwordEncryptor/BcryptPasswordEncryptor';
import { InMemoryUserRepository } from '../../repository/user/implementation/InMemoryUserRepository';
import { CreateUserRequestDTO } from '../createUser/createUserRequestDTO';
import { CreateUserUseCase } from '../createUser/createUserUseCase';
import { GetAllUsersUseCase } from './getAllUsersUseCase';

export class GetAllUsersController {
    constructor(
        private getAllUsersUseCase: GetAllUsersUseCase
    ) { }
    async handle(request: Request, response: Response): Promise<Response> {

        try {
            const users = await this.getAllUsersUseCase.execute();
            return response.status(200).json(users);
        }
        catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error'
            });
        }
    }
}
