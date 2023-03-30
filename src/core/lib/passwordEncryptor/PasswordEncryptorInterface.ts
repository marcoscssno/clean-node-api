export default interface PasswordEncryptorInterface {
    execute(password: string): Promise<string>
}