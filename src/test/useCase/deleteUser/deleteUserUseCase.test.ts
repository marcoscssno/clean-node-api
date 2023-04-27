import { it, expect, describe } from 'vitest';
import { DeleteUserUseCase } from '@useCase/deleteUser/deleteUserUseCase';
import { InMemoryUserRepository } from '@repository/user/implementation/InMemoryUserRepository';
import { User } from '@entity/user/User';

const userRepository = new InMemoryUserRepository();

const makeSut = () => {
    const sut = new DeleteUserUseCase(userRepository);
    return sut;
};

const createUser = async (): Promise<void> => {
    const user = new User ({
        name: 'Marcos',
        email: 'marcos@example.com',
        encryptedPassword: 'someEncryptedPassword'
    });
    await userRepository.save(user);
};

const getAllUsers = async (): Promise<User[] | []> => {
    const users = await userRepository.getAllUsers();
    return users;
}

describe('Delete User Use Case', () => {
    it('should delete an user', async () => {
        const sut = makeSut();
        await createUser();
        const users = await getAllUsers();
        const id = users[0].getId();

        await sut.execute(id);

        expect(users).not.toContainEqual(users[0]);
    });

    it('should throw error if no user is specified', async () => {
        const sut = makeSut();

        // @ts-expect-error
        expect(async () => await sut.execute()).rejects.toThrow();
    });
});
