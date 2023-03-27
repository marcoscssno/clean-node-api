import { describe, expect, it } from 'vitest'
import { User } from './User'

describe('User class', () => {
    it('should be created', () => {
        const userProps = {
            name: 'Marcos',
            email: 'marcos@example.com',
            encryptedPassword: 'somePassword'
        };
        const user: User = new User(userProps);
        expect(user.getName()).toEqual(userProps.name)
    })
})
