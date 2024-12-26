import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    async findAll(): Promise<Order[]> {
    console.log('Elementos obtenidos de la base de datos')
    return this.orderService.findAll();
    }

    @Post()
    async createOrder(
        @Body('cliente') customer: string,
        @Body('estado') estado: string,
        @Body('products') products: { productId: number, quantity: number }[]
    ): Promise<Order> {
        console.log('Orden enviada con exito a la base de datos')
        return this.orderService.createOrder(customer, estado, products);
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Order> {
    console.log('Orden con id obtenida con exito')
    return this.orderService.findById(id);
}

}
