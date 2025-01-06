import { Elysia, t } from 'elysia';
import { ProductController } from '../controllers/ProductController';

const productController = new ProductController();
const productRoutes = new Elysia({ prefix: '/products' })
    .post('/',
        ({ body }) => productController.create(body),
        {
            body: t.Object({
                name: t.String(),
                description: t.String(),
                price: t.Number(),
                categoryId: t.String()
            }),
            detail: {
                tags: ['Products'],
                description: 'Criar novo produto'
            }
        }
    )
    .get('/',
        () => productController.list(),
        {
            detail: {
                tags: ['Products'],
                description: 'Listar todos os produtos'
            }
        }
    )
    .get('/:id',
        ({ params }) => productController.findById(params.id),
        {
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['Products'],
                description: 'Buscar produto por ID'
            }
        }
    )
    .get('/category/:categoryId',
        ({ params }) => productController.findByCategory(params.categoryId),
        {
            params: t.Object({
                categoryId: t.String()
            }),
            detail: {
                tags: ['Products'],
                description: 'Buscar produtos por categoria'
            }
        }
    )
    .put('/:id',
        ({ params, body }) => productController.update(params.id, body),
        {
            params: t.Object({
                id: t.String()
            }),
            body: t.Object({
                name: t.Optional(t.String()),
                description: t.Optional(t.String()),
                price: t.Optional(t.Number()),
                categoryId: t.Optional(t.String())
            }),
            detail: {
                tags: ['Products'],
                description: 'Atualizar produto'
            }
        }
    )
    .delete('/:id',
        ({ params }) => productController.delete(params.id),
        {
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['Products'],
                description: 'Deletar produto'
            }
        }
    );

export { productRoutes }; 