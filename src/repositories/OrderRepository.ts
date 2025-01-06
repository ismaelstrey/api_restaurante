import { PrismaClient } from '@prisma/client';
import type { IOrder, IOrderItem, ICreateOrderItem } from '../interfaces/IOrder';

export class OrderRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    private mapOrderToInterface(order: any): IOrder {
        return {
            ...order,
            total: Number(order.total),
            items: order.items.map((item: any) => ({
                ...item,
                price: Number(item.price)
            }))
        };
    }

    async create(data: { userId: string, items: ICreateOrderItem[] }): Promise<IOrder> {
        const orderItems = await Promise.all(
            data.items.map(async (item) => {
                const product = await this.prisma.product.findUnique({
                    where: { id: item.productId }
                });
                if (!product) throw new Error(`Product ${item.productId} not found`);
                return {
                    ...item,
                    price: product.price
                };
            })
        );

        const total = orderItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

        const result = await this.prisma.order.create({
            data: {
                userId: data.userId,
                total,
                items: {
                    create: orderItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                user: true
            }
        });
        return this.mapOrderToInterface(result);
    }

    async findAll(): Promise<IOrder[]> {
        const orders = await this.prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                user: true,
                Payment: true
            }
        });
        return orders.map(order => this.mapOrderToInterface(order));
    }

    async findById(id: string): Promise<IOrder | null> {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                user: true,
                Payment: true
            }
        });
        return order ? this.mapOrderToInterface(order) : null;
    }

    async findByUser(userId: string): Promise<IOrder[]> {
        const orders = await this.prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                user: true,
                Payment: true
            }
        });
        return orders.map(order => this.mapOrderToInterface(order));
    }

    async updateStatus(id: string, status: IOrder['status']): Promise<IOrder> {
        const order = await this.prisma.order.update({
            where: { id },
            data: { status },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                user: true
            }
        });
        return this.mapOrderToInterface(order);
    }
} 