import { describe, expect, it } from 'vitest'
import { User } from "../../../entity/user/User";
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
    });
    it('should not update if no id is specified', async () => {
        const sut = new InMemoryUserRepository();
        const updatedUser = new User({
            name: 'Otto',
            email: 'otto@example.com',
            encryptedPassword: 'otherPassword'
        });
        // @ts-expect-error
        await expect(async () => await sut.update()).rejects.toThrow();
        // @ts-expect-error
        await expect(async () => await sut.update(updatedUser)).rejects.toThrow();
    });
    it('should not update if no user is specified', async () => {
        const sut = new InMemoryUserRepository();
        const someId = 'a1b2c3';
        // @ts-expect-error
        await expect(async () => await sut.update()).rejects.toThrow();
        // @ts-expect-error
        await expect(async () => await sut.update(someId)).rejects.toThrow();
    });
    it('should update user properties', async () => {
        const newUser = new User({
            name: 'Marcos',
            email: 'marcos@example.com',
            encryptedPassword: 'somePassword'
        });
        const sut = new InMemoryUserRepository();
        await sut.save(newUser);
        const userId = newUser.getId();
        const updatedUser = new User({
            name: 'Otto',
            email: 'otto@example.com',
            encryptedPassword: 'otherPassword'
        });
        await sut.update(userId, updatedUser);
        const user = await sut.getUserById(userId);
        expect(user?.getName()).toEqual(updatedUser.getName());
        expect(user?.getEmail()).toEqual(updatedUser.getEmail());
        expect(user?.getEncryptedPassword()).toEqual(updatedUser.getEncryptedPassword());
    });
    it('should throw error if user is not found', async () => {
        const sut = new InMemoryUserRepository();
        const someId = 'a1b2c3';
        const updatedUser = new User({
            name: 'Otto',
            email: 'otto@example.com',
            encryptedPassword: 'otherPassword'
        });
        await expect(async () => await sut.update(someId, updatedUser)).rejects.toThrow();
    });
})
