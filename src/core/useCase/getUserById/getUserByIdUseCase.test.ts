import { it, expect, describe } from 'vitest';
import { GetUserByIdUseCase } from './getUserByIdUseCase';

describe('Get User By Id Use Case', async () => {
    it('should ensure an id is passed', () => {
        const sut = new GetUserByIdUseCase();
        expect(sut.execute()).rejects.toThrow();
    });
    it('should return null if no user is found with provided id', async () => {
        const sut = new GetUserByIdUseCase();
        const someId: string = 'a1b2c3';
        expect(sut.execute(someId)).resolves.toBeNull();
    });
});
