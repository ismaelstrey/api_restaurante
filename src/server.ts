import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { userRoutes } from './routes/user.routes.js';
import { productRoutes } from './routes/product.routes.js';
import { orderRoutes } from './routes/order.routes.js';
import { categoryRoutes } from './routes/category.routes.js';
import { paymentRoutes } from './routes/payment.routes.js';
import { paymentTypeRoutes } from './routes/payment-type.routes.js';

const PORT = process.env.PORT || 3000;

(async () => {
    const app = new Elysia()
        .use(swagger({
            path: '/api-docs',
            documentation: {
                info: {
                    title: 'API Restaurante',
                    version: '1.0.0',
                    description: 'API para gerenciamento de restaurante',
                    contact: {
                        email: 'ismaelstrey@hotmail.com'
                    }
                }
            }
        }))
        .use(userRoutes)
        .use(productRoutes)
        .use(orderRoutes)
        .use(categoryRoutes)
        .use(paymentRoutes)
        .use(paymentTypeRoutes);


    // Checa erros
    app.onError(({ code, error, request }) => {
        console.error(`Erro: ${code}`, error instanceof Error ? error.message : 'Erro desconhecido');
        return {
            message: 'Ocorreu um erro no servidor',
            details: error instanceof Error ? error.message : 'Erro desconhecido',
        };
    });

    // Inicie o servidor
    await app.listen(PORT);

    console.log(`🚀 Server is running on http://localhost:${PORT}`);
})();
