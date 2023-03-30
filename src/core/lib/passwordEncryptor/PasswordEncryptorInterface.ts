export interface PasswordEncryptorInterface {
    execute(password: string): Promise<string>
}
