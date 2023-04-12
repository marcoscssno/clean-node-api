import { it, expect, describe } from 'vitest';
import { InMemoryUserRepository } from '@repository/user/implementation/InMemoryUserRepository';
import { GetUserByIdUseCase } from '@useCase/getUserById/getUserByIdUseCase';
import { CreateUserUseCase } from '@useCase/createUser/createUserUseCase';
import { BcryptPasswordEncryptor } from '@lib/passwordEncryptor/BcryptPasswordEncryptor'
import { CreateUserRequestDTO } from '@useCase/createUser/createUserRequestDTO';
import { GetAllUsersUseCase } from '@useCase/getAllUsers/getAllUsersUseCase';

describe('Get User By Id Use Case', async () => {
    it('should throw an error if no repository is specified', async () => {
        // @ts-expect-error
        const sut = new GetUserByIdUseCase();
        const someId: string = 'a1b2c3';
        expect(async () => sut.execute(someId)).rejects.toThrow();
    });
    it('should ensure an id is passed', () => {
        const userRepository = new InMemoryUserRepository();
        const sut = new GetUserByIdUseCase(userRepository);
        // @ts-expect-error
        expect(sut.execute()).rejects.toThrow();
    });
    it('should return null if no user is found with provided id', async () => {
        const userRepository = new InMemoryUserRepository();
        const sut = new GetUserByIdUseCase(userRepository);
        const someId: string = 'a1b2c3';
        expect(sut.execute(someId)).resolves.toBeNull();
    });
    it('should return an user if found', async () => {
        const userRepository = new InMemoryUserRepository();
        const passwordEncryptor = new BcryptPasswordEncryptor();
        const createUserUseCase = new CreateUserUseCase(userRepository, passwordEncryptor);
        const user: CreateUserRequestDTO = {
            name: 'Marcos',
            email: 'marcos@example.com',
            password: 'somePassword'
        }
        await createUserUseCase.execute(user);
        const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
        const users = await getAllUsersUseCase.execute();
        const someId = users[0].getId();
        const sut = new GetUserByIdUseCase(userRepository);
        const foundUser = await sut.execute(someId);
        const { name, email } = user;
        expect(foundUser).toContain({ name, email });
    })
});
