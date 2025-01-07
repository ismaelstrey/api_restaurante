import { PrismaClient } from '@prisma/client';
import type { IPaymentType } from '../interfaces/IPaymentType.js';

type CreatePaymentTypeData = Omit<IPaymentType, 'id' | 'createdAt' | 'updatedAt'>;

export class PaymentTypeRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    private mapToInterface(data: any): IPaymentType {
        return {
            ...data,
            description: data.description || undefined
        };
    }

    async create(data: CreatePaymentTypeData): Promise<IPaymentType> {
        const result = await this.prisma.paymentType.create({
            data
        });
        return this.mapToInterface(result);
    }

    async findAll(): Promise<IPaymentType[]> {
        const results = await this.prisma.paymentType.findMany();
        return results.map(this.mapToInterface);
    }

    async findById(id: string): Promise<IPaymentType | null> {
        const result = await this.prisma.paymentType.findUnique({
            where: { id }
        });
        return result ? this.mapToInterface(result) : null;
    }

    async update(id: string, data: Partial<CreatePaymentTypeData>): Promise<IPaymentType> {
        const result = await this.prisma.paymentType.update({
            where: { id },
            data
        });
        return this.mapToInterface(result);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.paymentType.delete({
            where: { id }
        });
    }

    async findActive(): Promise<IPaymentType[]> {
        const results = await this.prisma.paymentType.findMany({
            where: { isActive: true }
        });
        return results.map(this.mapToInterface);
    }
} 