import { IPayment } from './IPayment';

export interface IOrder {
    id: string;
    userId: string;
    status: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
    total: number;
    items: IOrderItem[];
    payment?: IPayment;
    createdAt: Date;
    updatedAt: Date;
}

export interface IOrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateOrderItem {
    productId: string;
    quantity: number;
} 