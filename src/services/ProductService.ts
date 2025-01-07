import type { IProduct } from '../interfaces/IProduct.js';
import { ProductRepository } from '../repositories/ProductRepository.js';
import { CategoryService } from './CategoryService.js';

export class ProductService {
    private productRepository: ProductRepository;
    private categoryService: CategoryService;

    constructor() {
        this.productRepository = new ProductRepository();
        this.categoryService = new CategoryService();
    }

    async createProduct(data: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<IProduct> {
        // Verifica se a categoria existe
        await this.categoryService.findCategoryById(data.categoryId);
        return this.productRepository.create(data);
    }

    async listProducts(): Promise<IProduct[]> {
        return this.productRepository.findAll();
    }

    async findProductById(id: string): Promise<IProduct> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    async findProductsByCategory(categoryId: string): Promise<IProduct[]> {
        // Verifica se a categoria existe
        await this.categoryService.findCategoryById(categoryId);
        return this.productRepository.findByCategory(categoryId);
    }

    async updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct> {
        await this.findProductById(id);
        if (data.categoryId) {
            await this.categoryService.findCategoryById(data.categoryId);
        }
        return this.productRepository.update(id, data);
    }

    async deleteProduct(id: string): Promise<void> {
        await this.findProductById(id);
        await this.productRepository.delete(id);
    }
} 