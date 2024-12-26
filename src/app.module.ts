import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './microservices/products/product.module';
import { OrderModule } from './microservices/orders/order.module';
import { typeOrmConfig } from './common/typeorm.config';
import { ClientsModule, Transport } from '@nestjs/microservices'; 
import { GatewayModule } from './gateway/gateway.module';
import { OrdersQueue } from './microservices/orders/queues/orders.queue'; 
import { ProductsQueue } from './microservices/products/queues/products.queue'; 

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // Configuración global de TypeORM
    ProductModule, 
    OrderModule,
    GatewayModule,


    // Configuración para RabbitMQ 
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE', // Nombre del servicio para RabbitMQ
        transport: Transport.RMQ, // Usar RabbitMQ como transportador de mis paquetes
        options: {
          urls: ['amqp://localhost:5672'], // Dirección de RabbitMQ donde lo voy a correr
          queue: 'orders_queue', // Nombre de la cola
          queueOptions: {
            durable: false, 
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [OrdersQueue, ProductsQueue],
})
export class AppModule {}
