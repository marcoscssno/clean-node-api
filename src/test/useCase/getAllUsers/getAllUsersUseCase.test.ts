import { it, expect, describe } from 'vitest';
import { InMemoryUserRepository } from '@repository/user/implementation/InMemoryUserRepository';
import { GetAllUsersUseCase } from '@useCase/getAllUsers/getAllUsersUseCase';
import { User } from '@entity/user/User';

const userRepository = new InMemoryUserRepository();

const makeSut = () => {
    const sut = new GetAllUsersUseCase(userRepository);
    return sut;
};

describe('Get All Users Use Case', () => {
    it('should return an empty array when there are no users', async () => {
        const sut = makeSut();
        
        const users = await sut.execute();
        
        expect(users).toEqual([]);
    });

    it('should return all users when there are users', async () => {
        const sut = makeSut();
        const firstUser = new User({
            name: 'Marcos',
            email: 'marcos@example.com',
            encryptedPassword: 'someEncryptedPassword'
        });
        const secondUser = new User({
            name: 'John Doe',
            email: 'johndoe@example.com',
            encryptedPassword: 'otherEncryptedPassword'
        });
        const users = await sut.execute();
        
        await userRepository.save(firstUser);
        await userRepository.save(secondUser);
        
        expect(users[0].getName()).toBe('Marcos');
        expect(users[1].getName()).toBe('John Doe');
    });
});
