import { PasswordEncryptorInterface } from "./PasswordEncryptorInterface";
import bcrypt from 'bcrypt';

// To do: Move salt rounds number to proper environment variable.
const saltRounds = 12;

export class BcryptPasswordEncryptor implements PasswordEncryptorInterface {
    async execute(password: string): Promise<string> {
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        return encryptedPassword;
    }
}
