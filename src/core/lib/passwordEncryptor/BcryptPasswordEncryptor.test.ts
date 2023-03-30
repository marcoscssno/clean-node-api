import { describe, expect, it } from 'vitest';
import BcryptPasswordEncryptor from './BcryptPasswordEncryptor';
import bcrypt from 'bcrypt';

describe('Bcrypt Password Encryptor', async () => {
    it('should encrypt a password', async () => {
        const password: string = 'somePassword';
        const encryptedPassword = await new BcryptPasswordEncryptor().execute(password);
        expect(encryptedPassword).not.toBe(password);
        const passwordsMatch: string = await bcrypt.compare(password, encryptedPassword);
        expect(passwordsMatch).toBeTruthy();
    })
})