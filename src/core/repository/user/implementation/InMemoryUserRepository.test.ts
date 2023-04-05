import { describe, expect, it } from 'vitest'
import { User } from "../../../entity/user/User";
import { InMemoryUserRepository } from './InMemoryUserRepository';

describe('In Memory User Repository', async () => {
    it('should return empty array if there is no users', async () => {
        const sut = new InMemoryUserRepository();
        const inMemoryUsers = await sut.getAllUsers();
        expect(inMemoryUsers).toEqual([]);
    });
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
    it('should delete an user', async () => {
        const user = new User({
            name: 'Jane',
            email: 'jane@example.com',
            encryptedPassword: 'otherPassword'
        });
        const sut = new InMemoryUserRepository();
        await sut.save(user);
        const inMemoryUsers = await sut.getAllUsers();
        const inMemoryUser = inMemoryUsers[0];
        expect(inMemoryUser).toEqual(user);
        const id = inMemoryUser.getId();
        await sut.delete(id);
        expect(inMemoryUsers).not.toContain(user);
    })
})
