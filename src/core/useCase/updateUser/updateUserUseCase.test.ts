import { it, expect, describe } from 'vitest';
import { UpdateUserUseCase } from './updateUserUseCase';

describe('Update User Use Case', () => {
    it('should throw error if no repository is specified', async () => {
        // @ts-expect-error
        const sut = new UpdateUserUseCase().execute();
        await expect(async () => sut).rejects.toThrow();
    })
});