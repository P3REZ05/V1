import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/microservices/products/entities/product.entity';

@Entity('detalles_pedidos')
export class OrderDetail {
    @PrimaryGeneratedColumn({ name: 'id_detalle' })
    id: number;

    @ManyToOne(() => Order, order => order.orderDetails)
    order: Order;

    @ManyToOne(() => Product, product => product.id)
    product: Product;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;
}
