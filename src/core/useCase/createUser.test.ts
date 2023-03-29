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
})
