import { Elysia, t } from 'elysia';
import { OrderController } from '../controllers/OrderController';

const orderController = new OrderController();
const orderRoutes = new Elysia({ prefix: '/orders' })
    .post('/',
        ({ body }) => orderController.create(body),
        {
            body: t.Object({
                userId: t.String(),
                items: t.Array(t.Object({
                    productId: t.String(),
                    quantity: t.Number()
                }))
            }),
            detail: {
                tags: ['Orders'],
                description: 'Criar novo pedido'
            }
        }
    )
    .get('/',
        () => orderController.list(),
        {
            detail: {
                tags: ['Orders'],
                description: 'Listar todos os pedidos'
            }
        }
    )
    .get('/:id',
        ({ params }) => orderController.findById(params.id),
        {
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['Orders'],
                description: 'Buscar pedido por ID'
            }
        }
    )
    .get('/user/:userId',
        ({ params }) => orderController.findByUser(params.userId),
        {
            params: t.Object({
                userId: t.String()
            }),
            detail: {
                tags: ['Orders'],
                description: 'Buscar pedidos por usuário'
            }
        }
    )
    .patch('/:id/status',
        ({ params, body }) => orderController.updateStatus(params.id, body),
        {
            params: t.Object({
                id: t.String()
            }),
            body: t.Object({
                status: t.Enum({
                    PENDING: 'PENDING',
                    PREPARING: 'PREPARING',
                    READY: 'READY',
                    DELIVERED: 'DELIVERED',
                    CANCELLED: 'CANCELLED'
                })
            }),
            detail: {
                tags: ['Orders'],
                description: 'Atualizar status do pedido'
            }
        }
    );

export { orderRoutes }; 