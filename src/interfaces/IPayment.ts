export interface IPayment {
    id: string;
    orderId: string;
    amount: number;
    paymentTypeId: string;
    status: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
    paymentType?: IPaymentType;
    order?: any;
}

export interface IPaymentType {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type PaymentStatus =
    | 'PENDING'
    | 'PROCESSING'
    | 'APPROVED'
    | 'REJECTED'
    | 'REFUNDED'
    | 'CANCELLED'; 