import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class NotificationGateway {
    // Escuchar el evento de la creación de un pedido
    @MessagePattern('order_created')
    handleOrderCreated(@Payload() data: { orderId: number }) {
        console.log(`Nuevo pedido creado con ID: ${data.orderId}`);
        // lógica de la notificación (por ejemplo, enviar un email, SMS, etc.)
    }
}
