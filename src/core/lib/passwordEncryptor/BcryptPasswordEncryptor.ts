import { User } from "../../entity/User";
import PasswordEncryptorInterface from "./PasswordEncryptorInterface";
import bcrypt from 'bcrypt';

// To do: Move salt rounds number to proper environment variable.
const saltRounds = 12;

export default class BcryptPasswordEncryptor implements PasswordEncryptorInterface {
    async execute(user: User, password: string) {
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        user.setEncryptedPassword(encryptedPassword);
    }
}