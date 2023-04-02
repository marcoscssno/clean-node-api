import { it, expect, describe } from 'vitest';
import { UpdateUserUseCase } from './updateUserUseCase';
import { InMemoryUserRepository } from '../../repository/user/implementation/InMemoryUserRepository';
import { BcryptPasswordEncryptor } from '../../lib/passwordEncryptor/BcryptPasswordEncryptor';
import { User } from '../../entity/user/User';

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
});