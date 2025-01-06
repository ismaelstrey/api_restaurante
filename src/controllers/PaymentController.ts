import { PaymentService } from '../services/PaymentService';

export class PaymentController {
    private paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    async create(body: { orderId: string; paymentTypeId: string }) {
        return await this.paymentService.createPayment(body.orderId, body.paymentTypeId);
    }

    async process(id: string) {
        return await this.paymentService.processPayment(id);
    }

    async approve(id: string) {
        return await this.paymentService.approvePayment(id);
    }

    async reject(id: string) {
        return await this.paymentService.rejectPayment(id);
    }

    async refund(id: string) {
        return await this.paymentService.refundPayment(id);
    }

    async list() {
        return await this.paymentService.listPayments();
    }

    async findById(id: string) {
        return await this.paymentService.findPaymentById(id);
    }
} 