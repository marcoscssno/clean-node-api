import { describe, expect, it } from 'vitest'
import { User } from '@entity/user/User';
import { validate as uuidValidate } from 'uuid';

describe('User Entity', () => {
    it('should assign an id when no id is passed', () => {
        const userProps = {
            name: 'Marcos',
            email: 'marcos@example.com',
            encryptedPassword: 'somePassword'
        };
        const user: User = new User(userProps);
        const userId = user.getId();
        expect(userId).not.toBe(null);
        expect(userId).toBeTypeOf('string');
        const userIdIsUuid = uuidValidate(userId);
        expect(userIdIsUuid).toBeTruthy();
    })
})
