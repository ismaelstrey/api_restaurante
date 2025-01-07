import type { IPayment } from '../interfaces/IPayment.js';
import { PaymentRepository } from '../repositories/PaymentRepository.js';
import { OrderService } from './OrderService.js';

export class PaymentService {
    private paymentRepository: PaymentRepository;
    private orderService: OrderService;

    constructor() {
        this.paymentRepository = new PaymentRepository();
        this.orderService = new OrderService();
    }

    async createPayment(orderId: string, paymentTypeId: string): Promise<IPayment> {
        const order = await this.orderService.findOrderById(orderId);

        // Verifica se já existe pagamento para este pedido
        const existingPayment = await this.paymentRepository.findByOrder(orderId);
        if (existingPayment) {
            throw new Error('Payment already exists for this order');
        }

        return this.paymentRepository.create({
            orderId,
            paymentTypeId,
            amount: order.total,
            status: 'PENDING'
        });
    }

    async processPayment(id: string): Promise<IPayment> {
        const payment = await this.paymentRepository.findById(id);
        if (!payment) {
            throw new Error('Payment not found');
        }

        if (payment.status !== 'PENDING') {
            throw new Error('Payment cannot be processed');
        }

        // Aqui você pode adicionar a lógica de integração com gateway de pagamento

        return this.paymentRepository.updateStatus(id, 'PROCESSING');
    }

    async approvePayment(id: string): Promise<IPayment> {
        const payment = await this.paymentRepository.findById(id);
        if (!payment) {
            throw new Error('Payment not found');
        }

        if (payment.status !== 'PROCESSING') {
            throw new Error('Payment must be processing to be approved');
        }

        return this.paymentRepository.updateStatus(id, 'APPROVED');
    }

    async rejectPayment(id: string): Promise<IPayment> {
        const payment = await this.paymentRepository.findById(id);
        if (!payment) {
            throw new Error('Payment not found');
        }

        return this.paymentRepository.updateStatus(id, 'REJECTED');
    }

    async refundPayment(id: string): Promise<IPayment> {
        const payment = await this.paymentRepository.findById(id);
        if (!payment) {
            throw new Error('Payment not found');
        }

        if (payment.status !== 'APPROVED') {
            throw new Error('Only approved payments can be refunded');
        }

        return this.paymentRepository.updateStatus(id, 'REFUNDED');
    }

    async listPayments(): Promise<IPayment[]> {
        return this.paymentRepository.findAll();
    }

    async findPaymentById(id: string): Promise<IPayment> {
        const payment = await this.paymentRepository.findById(id);
        if (!payment) {
            throw new Error('Payment not found');
        }
        return payment;
    }
} 