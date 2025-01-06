import { CategoryService } from '../services/CategoryService';

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    async create(body: { name: string }) {
        return await this.categoryService.createCategory(body);
    }

    async list() {
        return await this.categoryService.listCategories();
    }

    async findById(id: string) {
        return await this.categoryService.findCategoryById(id);
    }

    async update(id: string, body: { name: string }) {
        return await this.categoryService.updateCategory(id, body);
    }

    async delete(id: string) {
        await this.categoryService.deleteCategory(id);
        return { message: 'Category deleted successfully' };
    }
} 