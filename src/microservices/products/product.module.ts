import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { NotificationGateway } from '../orders/services/notification.gateway';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
    providers: [ProductService, NotificationGateway],
    exports: [ProductService], // Exporta ProductService para que pueda ser usado en otros módulos
})
export class ProductModule {}
