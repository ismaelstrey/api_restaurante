import { UserService } from '../services/UserService.js';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(body: any) {
        const { name, email, password, role } = body;
        return await this.userService.createUser({ name, email, password, role });
    }

    async list() {
        return await this.userService.listUsers();
    }

    async findById(id: string) {
        return await this.userService.findById(id);
    }
} 