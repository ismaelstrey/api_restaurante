import type { ICategory } from '../interfaces/ICategory';
import { CategoryRepository } from '../repositories/CategoryRepository';

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async createCategory(data: Omit<ICategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<ICategory> {
        return this.categoryRepository.create(data);
    }

    async listCategories(): Promise<ICategory[]> {
        return this.categoryRepository.findAll();
    }

    async findCategoryById(id: string): Promise<ICategory> {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }

    async updateCategory(id: string, data: Partial<ICategory>): Promise<ICategory> {
        await this.findCategoryById(id);
        return this.categoryRepository.update(id, data);
    }

    async deleteCategory(id: string): Promise<void> {
        await this.findCategoryById(id);
        await this.categoryRepository.delete(id);
    }
} 