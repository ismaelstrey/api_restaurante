import { Elysia, t } from 'elysia';
import { CategoryController } from '../controllers/CategoryController';

const categoryController = new CategoryController();
const categoryRoutes = new Elysia({ prefix: '/categories' })
    .post('/',
        ({ body }) => categoryController.create(body),
        {
            body: t.Object({
                name: t.String()
            }),
            detail: {
                tags: ['Categories'],
                description: 'Criar nova categoria'
            }
        }
    )
    .get('/',
        () => categoryController.list(),
        {
            detail: {
                tags: ['Categories'],
                description: 'Listar todas as categorias'
            }
        }
    )
    .get('/:id',
        ({ params }) => categoryController.findById(params.id),
        {
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['Categories'],
                description: 'Buscar categoria por ID'
            }
        }
    )
    .put('/:id',
        ({ params, body }) => categoryController.update(params.id, body),
        {
            params: t.Object({
                id: t.String()
            }),
            body: t.Object({
                name: t.String()
            }),
            detail: {
                tags: ['Categories'],
                description: 'Atualizar categoria'
            }
        }
    )
    .delete('/:id',
        ({ params }) => categoryController.delete(params.id),
        {
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['Categories'],
                description: 'Deletar categoria'
            }
        }
    );

export { categoryRoutes }; 