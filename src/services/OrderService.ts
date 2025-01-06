import type { IOrder, ICreateOrderItem } from '../interfaces/IOrder';
import { OrderRepository } from '../repositories/OrderRepository';
import { UserService } from './UserService';

export class OrderService {
    private orderRepository: OrderRepository;
    private userService: UserService;

    constructor() {
        this.orderRepository = new OrderRepository();
        this.userService = new UserService();
    }

    async createOrder(userId: string, items: ICreateOrderItem[]): Promise<IOrder> {
        await this.userService.findById(userId);

        if (!items.length) {
            throw new Error('Order must have at least one item');
        }

        return this.orderRepository.create({ userId, items });
    }

    async listOrders(): Promise<IOrder[]> {
        return this.orderRepository.findAll();
    }

    async findOrderById(id: string): Promise<IOrder> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }

    async findOrdersByUser(userId: string): Promise<IOrder[]> {
        await this.userService.findById(userId);
        return this.orderRepository.findByUser(userId);
    }

    async updateOrderStatus(id: string, status: IOrder['status']): Promise<IOrder> {
        await this.findOrderById(id);
        return this.orderRepository.updateStatus(id, status);
    }
} 