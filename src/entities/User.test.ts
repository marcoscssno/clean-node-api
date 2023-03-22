import { assert, describe, expect, it } from 'vitest'
import { User } from './User'

describe('User class', () => {
    it('should be created', () => {
        const name = "Marcos"
        const user: User = new User(name);
        expect(user.name).toEqual(name)
    })
})
