import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { ProductService } from 'src/microservices/products/services/product.service';
import { Product } from 'src/microservices/products/entities/product.entity';
import { NotificationModule } from '../queues/notification.module';  

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail, Product]),
    NotificationModule, 
  ],
  controllers: [OrderController],
  providers: [OrderService, ProductService], 
})
export class OrderModule {}
