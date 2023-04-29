import { describe, expect, it } from 'vitest';
import { CreateUserRequestDTO } from '@useCase/createUser/createUserRequestDTO';
import { CreateUserUseCase } from '@useCase/createUser/createUserUseCase';
import { InMemoryUserRepository } from '@repository/user/implementation/InMemoryUserRepository';
import { PasswordEncryptorInterface } from '@lib/passwordEncryptor/PasswordEncryptorInterface';
import { BcryptPasswordEncryptor } from '@lib/passwordEncryptor/BcryptPasswordEncryptor';

const userRepository = new InMemoryUserRepository();
const passwordEncryptor: PasswordEncryptorInterface = new BcryptPasswordEncryptor();
const makeSut = () => {
    const sut = new CreateUserUseCase(userRepository, passwordEncryptor);
    return sut;
};

describe('Create user use case', () => {
    it('should create an user', async () => {
        const sut = makeSut();
        const data: CreateUserRequestDTO = {
            name: 'Marcos',
            email: 'marcos@example.com',
            password: 'somePassword'
        };
        const users = await userRepository.getAllUsers();

        await sut.execute(data);
        
        expect(users[0].getName()).toEqual(data.name);
    });
    
    it('should not create an user when they already exist', async () => {
        const sut = makeSut();
        const firstUser: CreateUserRequestDTO = {
            name: 'Marcos',
            email: 'user@example.com',
            password: 'somePassword'
        };
        const secondUser: CreateUserRequestDTO = {
            name: 'John Doe',
            email: 'user@example.com',
            password: 'otherPassword'
        };

        await sut.execute(firstUser);

        expect(async () => await sut.execute(secondUser)).rejects.toThrowError();
    });
});
