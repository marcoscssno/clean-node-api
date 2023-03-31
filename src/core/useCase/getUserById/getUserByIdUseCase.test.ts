import { it, expect, describe } from 'vitest';
import { GetUserByIdUseCase } from './getUserByIdUseCase';

describe('Get User By Id Use Case', async () => {
    it('should ensure an id is passed', () => {
        const sut = new GetUserByIdUseCase();
        const id = 'abc123';
        expect(sut.execute()).rejects.toThrow();
    });
});
