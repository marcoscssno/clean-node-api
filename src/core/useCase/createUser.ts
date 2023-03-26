import { CreateUserRequestDTO } from "./createUserRequestDTO";

export class CreateUserUseCase {
    async execute(data: CreateUserRequestDTO): Promise<CreateUserRequestDTO> {
        return data;
    }
}