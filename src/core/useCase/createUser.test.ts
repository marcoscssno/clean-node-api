import { describe, expect, it } from 'vitest'
import { CreateUserRequestDTO } from './createUserRequestDTO'
import { CreateUserUseCase } from './createUserUseCase'
import { InMemoryUserRepository } from '../repository/implementation/InMemoryUserRepository'
import PasswordEncryptorInterface from '../lib/passwordEncryptor/PasswordEncryptorInterface';
import PasswordEncryptor from '../lib/passwordEncryptor/PasswordEncryptor';
import bcrypt from 'bcrypt';
import { User } from '../entity/User';

const userRepository = new InMemoryUserRepository();
const passwordEncryptor: PasswordEncryptorInterface = new PasswordEncryptor();

describe('Create user use case', () => {
    it('should create an user', async () => {
        const data: CreateUserRequestDTO = {
            name: 'Marcos',
            email: 'marcos@example.com',
            encryptedPassword: 'somePassword'
        }
        const sut = new CreateUserUseCase(userRepository, passwordEncryptor);
        await sut.execute(data);
        const users = await userRepository.getAllUsers();
        expect(users[0].getName()).toEqual(data.name)
    })

    it('should not create an user when they already exist', async () => {
        const firstUser: CreateUserRequestDTO = {
            name: 'Marcos',
            email: 'user@example.com',
            encryptedPassword: 'somePassword'
        }
        const secondUser: CreateUserRequestDTO = {
            name: 'John Doe',
            email: 'user@example.com',
            encryptedPassword: 'otherPassword'
        }
        const sut = new CreateUserUseCase(userRepository, passwordEncryptor);
        await sut.execute(firstUser);
        expect(async () => await sut.execute(secondUser)).rejects.toThrowError();
    })

    it('should encrypt user\'s password', async () => {
        const data: CreateUserRequestDTO = {
            name: 'Otto',
            email: 'otto@example.com',
            encryptedPassword: 'somePassword'
        }
        const sut = new CreateUserUseCase(userRepository, passwordEncryptor);
        await sut.execute(data);
        const { email, encryptedPassword } = data
        const user: User | undefined = await userRepository.findByEmail(email);
        if (user) {
            expect(user.getEncryptedPassword()).not.toBe(encryptedPassword);
            const passwordsMatch: string = await bcrypt.compare(encryptedPassword, user.getEncryptedPassword());
            expect(passwordsMatch).toBeTruthy();
        }
    })
})
