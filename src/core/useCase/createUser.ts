import { CreateUserRequestDTO } from "./createUserRequestDTO";

export class CreateUserUseCase {
    constructor() {}
    async execute(data: CreateUserRequestDTO): Promise<CreateUserRequestDTO> {
        return data;
    }
}