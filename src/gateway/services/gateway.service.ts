import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
    private client: ClientProxy;

    constructor() {
    this.client = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
        urls: ['amqp://localhost:5672'], // URL del servidor RabbitMQ
        queue: 'orders_queue', // Cola para los mensajes relacionados con órdenes
        queueOptions: {
            durable: false,
        },
    },
});
}

    async publishMessage(pattern: string, data: any): Promise<void> {
    this.client.emit(pattern, data); // Publicar mensaje usando un patrón
    }
}
