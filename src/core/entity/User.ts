export type UserProps = {
    id: string,
    name: string,
    email: string,
    encryptedPassword: string
}

export class User {
    private readonly id: string;
    private name: string;
    private email: string;
    private encryptedPassword: string;
    constructor(props: Omit<UserProps, 'id'>, id?: string) {
        Object.assign(this, props)
    }
    public getName(): string {
        return this.name;
    }
    public getEmail(): string {
        return this.email;
    }
}