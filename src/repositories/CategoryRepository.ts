import { PrismaClient } from '@prisma/client';
import type { ICategory } from '../interfaces/ICategory';

export class CategoryRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(data: Omit<ICategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<ICategory> {
        return this.prisma.category.create({
            data
        });
    }

    async findAll(): Promise<ICategory[]> {
        return this.prisma.category.findMany();
    }

    async findById(id: string): Promise<ICategory | null> {
        return this.prisma.category.findUnique({
            where: { id }
        });
    }

    async update(id: string, data: Partial<ICategory>): Promise<ICategory> {
        return this.prisma.category.update({
            where: { id },
            data
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.category.delete({
            where: { id }
        });
    }
} 