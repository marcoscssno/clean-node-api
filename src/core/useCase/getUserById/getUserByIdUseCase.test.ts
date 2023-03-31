import { it, expect, describe } from 'vitest';
import { GetUserByIdUseCase } from './getUserByIdUseCase';

describe('Get User By Id Use Case', async () => {
    it('should ensure an id is passed', () => {
        const sut = new GetUserByIdUseCase();
        expect(sut.execute()).rejects.toThrow();
    });
});
