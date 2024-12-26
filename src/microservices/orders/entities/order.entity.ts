import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { OrderDetail } from './order-detail.entity';

@Entity('pedidos')
export class Order {
    @PrimaryGeneratedColumn({ name: 'id_pedido' })
    id: number;

    @Column()
    cliente: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    total: number;

    @Column()
    estado: string;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
    orderDetails: OrderDetail[];
}
