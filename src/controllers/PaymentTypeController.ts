import { PaymentTypeService } from '../services/PaymentTypeService.js';

export class PaymentTypeController {
    private paymentTypeService: PaymentTypeService;

    constructor() {
        this.paymentTypeService = new PaymentTypeService();
    }

    async create(body: { name: string; description?: string }) {
        return await this.paymentTypeService.createPaymentType(body);
    }

    async list() {
        return await this.paymentTypeService.listPaymentTypes();
    }

    async listActive() {
        return await this.paymentTypeService.listActivePaymentTypes();
    }

    async findById(id: string) {
        return await this.paymentTypeService.findPaymentTypeById(id);
    }

    async update(id: string, body: { name?: string; description?: string; isActive?: boolean }) {
        return await this.paymentTypeService.updatePaymentType(id, body);
    }

    async delete(id: string) {
        await this.paymentTypeService.deletePaymentType(id);
        return { message: 'Payment type deleted successfully' };
    }

    async toggleStatus(id: string) {
        return await this.paymentTypeService.togglePaymentTypeStatus(id);
    }
} 