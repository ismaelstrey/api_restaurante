import type { IUser } from '../interfaces/IUser';
import { UserRepository } from '../repositories/UserRepository';
import { hash } from '../utils/hash';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
        const userExists = await this.userRepository.findByEmail(data.email);

        if (userExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await hash(data.password);

        return this.userRepository.create({
            ...data,
            password: hashedPassword
        });
    }

    async listUsers(): Promise<IUser[]> {
        return this.userRepository.findAll();
    }

    async findById(id: string): Promise<IUser | null> {
        return this.userRepository.findById(id);
    }
} 