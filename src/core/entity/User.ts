import { v4 as uuidv4 } from 'uuid';

import UserProps from './UserProps';

export class User {
    private readonly id: string;
    private name: string;
    private email: string;
    private encryptedPassword: string;
    constructor(props: Omit<UserProps, 'id'>, id?: string) {
        Object.assign(this, props);
        if(!id) {
            this.id = uuidv4();
        }
    }
    public getName(): string {
        return this.name;
    }
    public getEmail(): string {
        return this.email;
    }
    public getEncryptedPassword(): string {
        return this.encryptedPassword;
    }
    public setEncryptedPassword(encryptedPassword: string): void {
        this.encryptedPassword = encryptedPassword;
    }
}