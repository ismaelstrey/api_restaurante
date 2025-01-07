import { ProductService } from '../services/ProductService.js';
import type { IProduct } from '../interfaces/IProduct.js';

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    async create(body: {
        name: string;
        description: string;
        price: number;
        categoryId: string;
    }) {
        return await this.productService.createProduct(body);
    }

    async list() {
        return await this.productService.listProducts();
    }

    async findById(id: string) {
        return await this.productService.findProductById(id);
    }

    async findByCategory(categoryId: string) {
        return await this.productService.findProductsByCategory(categoryId);
    }

    async update(id: string, body: Partial<{
        name: string;
        description: string;
        price: number;
        categoryId: string;
    }>) {
        return await this.productService.updateProduct(id, body);
    }

    async delete(id: string) {
        await this.productService.deleteProduct(id);
        return { message: 'Product deleted successfully' };
    }
} 