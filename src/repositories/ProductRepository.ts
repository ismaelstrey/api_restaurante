import { PrismaClient } from '@prisma/client';
import type { IProduct } from '../interfaces/IProduct';

export class ProductRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    private mapProductToInterface(product: any): IProduct {
        return {
            ...product,
            price: Number(product.price)
        };
    }

    async create(data: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<IProduct> {
        const result = await this.prisma.product.create({
            data,
            include: { category: true }
        });
        return this.mapProductToInterface(result);
    }

    async findAll(): Promise<IProduct[]> {
        const products = await this.prisma.product.findMany({
            include: { category: true }
        });
        return products.map(product => this.mapProductToInterface(product));
    }

    async findById(id: string): Promise<IProduct | null> {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { category: true }
        });
        return product ? this.mapProductToInterface(product) : null;
    }

    async findByCategory(categoryId: string): Promise<IProduct[]> {
        const products = await this.prisma.product.findMany({
            where: { categoryId },
            include: { category: true }
        });
        return products.map(product => this.mapProductToInterface(product));
    }

    async update(id: string, data: Partial<IProduct>): Promise<IProduct> {
        const product = await this.prisma.product.update({
            where: { id },
            data,
            include: { category: true }
        });
        return this.mapProductToInterface(product);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.product.delete({
            where: { id }
        });
    }
} 