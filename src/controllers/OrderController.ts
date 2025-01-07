import { OrderService } from '../services/OrderService.js';
import type { IOrder } from '../interfaces/IOrder.js';

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    async create(body: {
        userId: string;
        items: { productId: string; quantity: number; }[];
    }) {
        return await this.orderService.createOrder(body.userId, body.items);
    }

    async list() {
        return await this.orderService.listOrders();
    }

    async findById(id: string) {
        return await this.orderService.findOrderById(id);
    }

    async findByUser(userId: string) {
        return await this.orderService.findOrdersByUser(userId);
    }

    async updateStatus(id: string, body: { status: IOrder['status'] }) {
        return await this.orderService.updateOrderStatus(id, body.status);
    }
} 