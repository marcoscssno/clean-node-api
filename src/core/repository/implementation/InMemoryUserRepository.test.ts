import { describe, expect, it } from 'vitest'
import { User } from "../../entity/User";
import { InMemoryUserRepository } from './InMemoryUserRepository'

describe('In Memory User Repository', async () => {
    it('should return empty array if there is no users', async () => {
        const sut = new InMemoryUserRepository();
        const inMemoryUsers = await sut.getAllUsers();
        expect(inMemoryUsers).toEqual([]);
    })

    it('should create an user', async () => {
        const user = new User({
            name: 'Marcos',
            email: 'marcos@example.com',
            encryptedPassword: 'somePassword'
        });
        const sut = new InMemoryUserRepository();
        await sut.save(user);
        const inMemoryUsers = await sut.getAllUsers();
        const inMemoryUser = inMemoryUsers[0];
        expect(inMemoryUser).toEqual(user);
    })
})
