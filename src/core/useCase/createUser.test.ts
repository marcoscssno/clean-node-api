import { describe, expect, it } from 'vitest'
import { CreateUserRequestDTO } from './createUserRequestDTO'
import { CreateUserUseCase } from './createUserUseCase'
import { InMemoryUserRepository } from '../repository/implementation/InMemoryUserRepository'

const userRepository = new InMemoryUserRepository();

describe('Create user use case', () => {
    it('should create an user', async () => {
        const data: CreateUserRequestDTO = {
            name: 'Marcos',
            email: 'marcos@example.com',
            encryptedPassword: 'somePassword'
        }
        const sut = new CreateUserUseCase(userRepository);
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
        const sut = new CreateUserUseCase(userRepository);
        await sut.execute(firstUser);
        expect(async () => await sut.execute(secondUser)).rejects.toThrowError();
    })
})
