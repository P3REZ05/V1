import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from '../microservices/products/entities/product.entity';
import { Order } from '../microservices/orders/entities/order.entity';
import { OrderDetail } from '../microservices/orders/entities/order-detail.entity'; 


// Conexion A mi Base de datos Mysql
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost', 
    port: 3306,        
    username: 'daniel',  
    password: '',  
    database: 'productos_service', 
    entities: [Product, Order, OrderDetail], 
    synchronize: true, 
};
