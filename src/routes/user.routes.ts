import { Elysia, t } from 'elysia';
import { UserController } from '../controllers/UserController';

const userController = new UserController();
const userRoutes = new Elysia({ prefix: '/users' })
    .post('/',
        ({ body }) => userController.create(body),
        {
            body: t.Object({
                name: t.String(),
                email: t.String(),
                password: t.String(),
                role: t.Enum({ ADMIN: 'ADMIN', CUSTOMER: 'CUSTOMER' })
            }),
            detail: {
                tags: ['Users'],
                description: 'Criar novo usuário'
            }
        }
    )
    .get('/',
        () => userController.list(),
        {
            detail: {
                tags: ['Users'],
                description: 'Listar todos os usuários'
            }
        }
    )
    .get('/:id',
        ({ params }) => userController.findById(params.id),
        {
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['Users'],
                description: 'Buscar usuário por ID'
            }
        }
    );

export { userRoutes }; 