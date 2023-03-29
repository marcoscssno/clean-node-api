import { User } from "../../entity/User";

export default interface PasswordEncryptorInterface {
    execute(user: User, password: string): Promise<void>
}