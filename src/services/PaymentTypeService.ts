import type { IPaymentType } from '../interfaces/IPaymentType.js';
import { PaymentTypeRepository } from '../repositories/PaymentTypeRepository.js';

export class PaymentTypeService {
    private paymentTypeRepository: PaymentTypeRepository;

    constructor() {
        this.paymentTypeRepository = new PaymentTypeRepository();
    }

    async createPaymentType(data: { name: string; description?: string }): Promise<IPaymentType> {
        return this.paymentTypeRepository.create({
            ...data,
            isActive: true
        });
    }

    async listPaymentTypes(): Promise<IPaymentType[]> {
        return this.paymentTypeRepository.findAll();
    }

    async listActivePaymentTypes(): Promise<IPaymentType[]> {
        return this.paymentTypeRepository.findActive();
    }

    async findPaymentTypeById(id: string): Promise<IPaymentType> {
        const paymentType = await this.paymentTypeRepository.findById(id);
        if (!paymentType) {
            throw new Error('Payment type not found');
        }
        return paymentType;
    }

    async updatePaymentType(id: string, data: Partial<{ name: string; description: string; isActive: boolean }>): Promise<IPaymentType> {
        await this.findPaymentTypeById(id);
        return this.paymentTypeRepository.update(id, data);
    }

    async deletePaymentType(id: string): Promise<void> {
        await this.findPaymentTypeById(id);
        await this.paymentTypeRepository.delete(id);
    }

    async togglePaymentTypeStatus(id: string): Promise<IPaymentType> {
        const paymentType = await this.findPaymentTypeById(id);
        return this.paymentTypeRepository.update(id, {
            isActive: !paymentType.isActive
        });
    }
} 