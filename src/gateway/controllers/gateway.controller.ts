import { Controller, Post, Body } from '@nestjs/common';
import { GatewayService } from '../services/gateway.service'; 

@Controller('gateway')
export class GatewayController {
    constructor(private readonly gatewayService: GatewayService) {}

    @Post('orders')
    async createOrder(@Body() data: any) {
    console.log('Publicando evento de creación de orden en RabbitMQ:', data);
    await this.gatewayService.publishMessage('order_created', data);
    return { message: 'Orden enviada al servicio de órdenes :).' };
    }
}
