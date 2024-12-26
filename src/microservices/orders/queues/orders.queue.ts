import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { OrderService } from '../services/order.service'; 

@Injectable()
export class OrdersQueue {
    constructor(private readonly orderService: OrderService) {}

  @EventPattern('order_created') // Patrón para mensajes de creación de órdenes
    async handleOrderCreated(data: any) {
    console.log('Mensaje recibido en orders_queue:', data);
    const { cliente, estado, products } = data;
    await this.orderService.createOrder(cliente, estado, products);
    }
}
