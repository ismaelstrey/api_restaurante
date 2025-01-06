import { PrismaClient } from '@prisma/client';
import type { IPayment } from '../interfaces/IPayment';

type CreatePaymentData = {
    orderId: string;
    amount: number;
    paymentTypeId: string;
    status: IPayment['status'];
};

export class PaymentRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    private mapPaymentToInterface(payment: any): IPayment {
        return {
            ...payment,
            amount: Number(payment.amount)
        };
    }

    async create(data: CreatePaymentData): Promise<IPayment> {
        const result = await this.prisma.payment.create({
            data: {
                orderId: data.orderId,
                amount: data.amount,
                paymentTypeId: data.paymentTypeId,
                status: data.status
            },
            include: {
                paymentType: true,
                order: true
            }
        });
        return this.mapPaymentToInterface(result);
    }

    async findAll(): Promise<IPayment[]> {
        const payments = await this.prisma.payment.findMany({
            include: {
                paymentType: true,
                order: true
            }
        });
        return payments.map(payment => this.mapPaymentToInterface(payment));
    }

    async findById(id: string): Promise<IPayment | null> {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
            include: {
                paymentType: true,
                order: true
            }
        });
        return payment ? this.mapPaymentToInterface(payment) : null;
    }

    async findByOrder(orderId: string): Promise<IPayment | null> {
        const payment = await this.prisma.payment.findUnique({
            where: { orderId },
            include: {
                paymentType: true,
                order: true
            }
        });
        return payment ? this.mapPaymentToInterface(payment) : null;
    }

    async updateStatus(id: string, status: IPayment['status']): Promise<IPayment> {
        const payment = await this.prisma.payment.update({
            where: { id },
            data: { status },
            include: {
                paymentType: true,
                order: true
            }
        });
        return this.mapPaymentToInterface(payment);
    }
} 