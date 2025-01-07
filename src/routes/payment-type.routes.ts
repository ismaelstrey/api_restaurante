import { Elysia, t } from 'elysia';
import { PaymentTypeController } from '../controllers/PaymentTypeController.js';

const paymentTypeController = new PaymentTypeController();
const paymentTypeRoutes = new Elysia({ prefix: '/payment-types' })
    .post('/',
        ({ body }) => paymentTypeController.create(body),
        {
            body: t.Object({
                name: t.String(),
                description: t.Optional(t.String())
            }),
            detail: {
                tags: ['Payment Types'],
                description: 'Criar novo tipo de pagamento'
            }
        }
    )
    .get('/',
        () => paymentTypeController.list(),
        {
            detail: {
                tags: ['Payment Types'],
                description: 'Listar todos os tipos de pagamento'
            }
        }
    )
    .get('/active',
        () => paymentTypeController.listActive(),
        {
            detail: {
                tags: ['Payment Types'],
                description: 'Listar tipos de pagamento ativos'
            }
        }
    )
    .get('/:id',
        ({ params }) => paymentTypeController.findById(params.id),
        {
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['Payment Types'],
                description: 'Buscar tipo de pagamento por ID'
            }
        }
    )
    .put('/:id',
        ({ params, body }) => paymentTypeController.update(params.id, body),
        {
            params: t.Object({
                id: t.String()
            }),
            body: t.Object({
                name: t.Optional(t.String()),
                description: t.Optional(t.String()),
                isActive: t.Optional(t.Boolean())
            }),
            detail: {
                tags: ['Payment Types'],
                description: 'Atualizar tipo de pagamento'
            }
        }
    )
    .delete('/:id',
        ({ params }) => paymentTypeController.delete(params.id),
        {
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['Payment Types'],
                description: 'Deletar tipo de pagamento'
            }
        }
    )
    .patch('/:id/toggle-status',
        ({ params }) => paymentTypeController.toggleStatus(params.id),
        {
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['Payment Types'],
                description: 'Alternar status do tipo de pagamento'
            }
        }
    );

export { paymentTypeRoutes }; 