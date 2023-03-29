import { describe, expect, it } from 'vitest';
import { User } from '../../entity/User';
import { CreateUserRequestDTO } from '../../useCase/createUserRequestDTO';
import BcryptPasswordEncryptor from './BcryptPasswordEncryptor';
import bcrypt from 'bcrypt';

describe('Bcrypt Password Encryptor', async () => {
    it('should encrypt user\'s password', async () => {
        const data: CreateUserRequestDTO = {
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            encryptedPassword: 'somePassword'
        }
        const user: User = new User(data);
        const { encryptedPassword } = data;
        await new BcryptPasswordEncryptor().execute(user, encryptedPassword);
        expect(user.getEncryptedPassword()).not.toBe(encryptedPassword);
        const passwordsMatch: string = await bcrypt.compare(encryptedPassword, user.getEncryptedPassword());
        expect(passwordsMatch).toBeTruthy();
    })
})