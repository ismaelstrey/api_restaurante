import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { userRoutes } from './routes/user.routes';
import { productRoutes } from './routes/product.routes';
import { orderRoutes } from './routes/order.routes';
import { categoryRoutes } from './routes/category.routes';
import { paymentRoutes } from './routes/payment.routes';
import { paymentTypeRoutes } from './routes/payment-type.routes';

const app = new Elysia()
    .use(swagger({
        documentation: {
            info: {
                title: 'API Restaurante',
                version: '1.0.0',
                description: 'API para gerenciamento de restaurante'
            }
        }
    }))
    .use(userRoutes)
    .use(productRoutes)
    .use(orderRoutes)
    .use(categoryRoutes)
    .use(paymentRoutes)
    .use(paymentTypeRoutes)
    .listen(process.env.PORT || 3000);

console.log(`🚀 Server is running on port ${process.env.PORT || 3000}`); 