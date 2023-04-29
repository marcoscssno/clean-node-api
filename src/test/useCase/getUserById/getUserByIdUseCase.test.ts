import { it, expect, describe } from 'vitest';
import { InMemoryUserRepository } from '@repository/user/implementation/InMemoryUserRepository';
import { GetUserByIdUseCase } from '@useCase/getUserById/getUserByIdUseCase';
import { User } from '@entity/user/User';

const userRepository = new InMemoryUserRepository();
const makeSut = () => {
    const sut = new GetUserByIdUseCase(userRepository);
    return sut;
};

describe('Get User By Id Use Case', async () => {
    it('should throw an error if no repository is specified', async () => {
        // @ts-expect-error
        const sut = new GetUserByIdUseCase();
        const someId: string = 'a1b2c3';
        
        expect(async () => await sut.execute(someId)).rejects.toThrow();
    });

    it('should ensure an id is passed', async () => {
        const sut = makeSut();

        // @ts-expect-error
        const getUserById = async () => await sut.execute();

        expect(async () => getUserById()).rejects.toThrow();
    });

    it('should return null if no user is found with provided id', async () => {
        const sut = makeSut();
        const someId: string = 'a1b2c3';

        const user = await sut.execute(someId);

        expect(user).toBeNull();
    });

    it('should return an user if found', async () => {
        const sut = makeSut();
        const user = new User ({
            name: 'Marcos',
            email: 'marcos@example.com',
            encryptedPassword: 'somePassword'
        });
        await userRepository.save(user);
        const users = await userRepository.getAllUsers();
        const someId = users[0].getId();
        const name = user.getName();
        const email = user.getEmail();
        
        const foundUser = await sut.execute(someId);

        expect(foundUser).toContain({ name, email });
    });
});
