import { it, expect, describe } from 'vitest';
import { BcryptPasswordEncryptor } from '../../lib/passwordEncryptor/BcryptPasswordEncryptor';
import { InMemoryUserRepository } from '../../repository/user/implementation/InMemoryUserRepository';
import { CreateUserRequestDTO } from '../createUser/createUserRequestDTO';
import { CreateUserUseCase } from '../createUser/createUserUseCase';
import { GetAllUsersUseCase } from './getAllUsersUseCase';

describe('Get All Users Use Case', () => {
    it('should return an empty array when there are no users', async () => {
        const userRepository = new InMemoryUserRepository();
        const sut = new GetAllUsersUseCase(userRepository);
        const users = await sut.execute();
        expect(users).toEqual([]);
    })

    it('should return all users when there are users', async () => {
        const firstUser: CreateUserRequestDTO = {
            name: 'Marcos',
            email: 'marcos@example.com',
            password: 'somePassword'
        }
        const secondUser: CreateUserRequestDTO = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'otherPassword'
        }
        const userRepository = new InMemoryUserRepository();
        const passwordEncryptor = new BcryptPasswordEncryptor();
        const createUserUseCase = new CreateUserUseCase(userRepository, passwordEncryptor);
        await createUserUseCase.execute(firstUser);
        await createUserUseCase.execute(secondUser);
        const sut = new GetAllUsersUseCase(userRepository);
        const users = await sut.execute();
        expect(users[0].getName()).toBe('Marcos');
        expect(users[1].getName()).toBe('John Doe');
    })
})