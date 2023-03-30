import { User } from "../../entity/User";

export default interface PasswordEncryptorInterface {
    execute(password: string): Promise<string>
}