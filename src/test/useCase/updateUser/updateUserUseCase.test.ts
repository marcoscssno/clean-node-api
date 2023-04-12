import { it, expect, describe } from 'vitest';
import { UpdateUserUseCase } from '@useCase/updateUser/updateUserUseCase';
import { InMemoryUserRepository } from '@repository/user/implementation/InMemoryUserRepository';
import { CreateUserUseCase } from '@useCase/createUser/createUserUseCase';
import { BcryptPasswordEncryptor } from '@lib/passwordEncryptor/BcryptPasswordEncryptor';
import { GetAllUsersUseCase } from '@useCase/getAllUsers/getAllUsersUseCase';
import { User } from '@entity/user/User';

describe('Update User Use Case', () => {
    it('should throw error if no repository is specified', async () => {
        // @ts-expect-error
        const sut = new UpdateUserUseCase().execute();
        await expect(async () => sut).rejects.toThrow();
    });
    it('should throw error if no id is specified', async () => {
        const userRepository = new InMemoryUserRepository();
        const passwordEncryptor = new BcryptPasswordEncryptor();
        const sut = new UpdateUserUseCase(userRepository, passwordEncryptor);
        // @ts-expect-error
        await expect(async () => sut.execute()).rejects.toThrow();
        const updatedUser = new User({
            name: 'Otto',
            email: 'otto@example.com',
            encryptedPassword: 'otherPassword'
        });
        // @ts-expect-error
        await expect(async () => sut.execute(updatedUser)).rejects.toThrow();
    });
    it('should throw error if no user is specified', async () => {
        const userRepository = new InMemoryUserRepository();
        const passwordEncryptor = new BcryptPasswordEncryptor();
        const sut = new UpdateUserUseCase(userRepository, passwordEncryptor);
        // @ts-expect-error
        await expect(async () => sut.execute()).rejects.toThrow();
        const someId = 'a1b2c3';
        // @ts-expect-error
        await expect(async () => sut.execute(someId)).rejects.toThrow();
    });
    it('should update user properties', async () => {
        const userRepository = new InMemoryUserRepository();
        const passwordEncryptor = new BcryptPasswordEncryptor();
        const createUserUseCase = new CreateUserUseCase(userRepository, passwordEncryptor);
        const newUser = ({
            name: 'Marcos',
            email: 'marcos@example.com',
            password: 'somePassword'
        });
        await createUserUseCase.execute(newUser);
        const getAllUsers = new GetAllUsersUseCase(userRepository);
        const users = await getAllUsers.execute();
        const foundUser = users[0];
        const userId = foundUser.getId();
        const updateUserUseCase = new UpdateUserUseCase(userRepository, passwordEncryptor);
        const updatedUser = {
            name: 'Otto',
            email: 'otto@example.com',
            password: 'otherPassword'
        };
        const sut = updateUserUseCase;
        await sut.execute(userId, updatedUser);
        expect(foundUser?.getName()).toEqual(updatedUser.name);
        expect(foundUser?.getEmail()).toEqual(updatedUser.email);
    });
});