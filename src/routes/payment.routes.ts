import { Elysia, t } from 'elysia';
import { PaymentController } from '../controllers/PaymentController';

const paymentController = new PaymentController();
const paymentRoutes = new Elysia({ prefix: '/payments' })
    .post('/',
        ({ body }) => paymentController.create(body),
        {
            body: t.Object({
                orderId: t.String(),
                paymentTypeId: t.String()
            }),
            detail: {
                tags: ['Payments'],
                description: 'Criar novo pagamento'
            }
        }
    )
    .post('/:id/process',
        ({ params }) => paymentController.process(params.id),
        {
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['Payments'],
                description: 'Processar pagamento'
            }
        }
    )
    .post('/:id/approve',
        ({ params }) => paymentController.approve(params.id),
        {
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['Payments'],
                description: 'Aprovar pagamento'
            }
        }
    )
    .post('/:id/reject',
        ({ params }) => paymentController.reject(params.id),
        {
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['Payments'],
                description: 'Rejeitar pagamento'
            }
        }
    )
    .post('/:id/refund',
        ({ params }) => paymentController.refund(params.id),
        {
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['Payments'],
                description: 'Reembolsar pagamento'
            }
        }
    )
    .get('/',
        () => paymentController.list(),
        {
            detail: {
                tags: ['Payments'],
                description: 'Listar todos os pagamentos'
            }
        }
    )
    .get('/:id',
        ({ params }) => paymentController.findById(params.id),
        {
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['Payments'],
                description: 'Buscar pagamento por ID'
            }
        }
    );

export { paymentRoutes }; 