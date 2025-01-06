import { PrismaClient } from '@prisma/client';
import type { IUser } from '../interfaces/IUser';

export class UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
        return this.prisma.user.create({
            data
        });
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

    async findById(id: string): Promise<IUser | null> {
        return this.prisma.user.findUnique({
            where: { id }
        });
    }

    async findAll(): Promise<IUser[]> {
        return this.prisma.user.findMany();
    }
} 