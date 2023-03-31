import { it, expect, describe } from 'vitest';
import { InMemoryUserRepository } from '../../repository/user/implementation/InMemoryUserRepository';
import { GetUserByIdUseCase } from './getUserByIdUseCase';

describe('Get User By Id Use Case', async () => {
    it('should throw an error if no repository is specified', async () => {
        const sut = new GetUserByIdUseCase();
        const someId: string = 'a1b2c3';
        expect(async () => sut.execute(someId)).rejects.toThrow();
    });
    it('should ensure an id is passed', () => {
        const userRepository = new InMemoryUserRepository();
        const sut = new GetUserByIdUseCase(userRepository);
        expect(sut.execute()).rejects.toThrow();
    });
    it('should return null if no user is found with provided id', async () => {
        const userRepository = new InMemoryUserRepository();
        const sut = new GetUserByIdUseCase(userRepository);
        const someId: string = 'a1b2c3';
        expect(sut.execute(someId)).resolves.toBeNull();
    });
});
