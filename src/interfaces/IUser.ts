export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'CUSTOMER';
    createdAt: Date;
    updatedAt: Date;
} 