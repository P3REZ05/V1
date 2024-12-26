import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderDetail } from '../entities/order-detail.entity';
import { ProductService } from 'src/microservices/products/services/product.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>,

        private readonly productService: ProductService,
    ) {}

    // Creación del Pedido
    async createOrder(customer: string, estado: string, products: { productId: number, quantity: number }[]): Promise<Order> {
        if (!products || products.length === 0) {
            throw new HttpException('No se pueden crear pedidos sin productos.', HttpStatus.BAD_REQUEST);
        }

        let total = 0;

        // Validación de productos y cálculo del total
        for (const productData of products) {
            const product = await this.productService.findById(productData.productId);

            if (!product || product.stock < productData.quantity) {
                throw new HttpException(
                    `Producto ${product?.name || productData.productId} no tiene suficiente stock`,
                    HttpStatus.BAD_REQUEST
                );
            }

            total += productData.quantity * product.precio;
        }

        // Crear el pedido después de todas las validaciones
        const order = new Order();
        order.cliente = customer;
        order.estado = estado;
        order.total = total;

        const savedOrder = await this.orderRepository.save(order);

        // Crear los detalles del pedido y actualizar el stock
        for (const productData of products) {
            const product = await this.productService.findById(productData.productId);

            const orderDetail = new OrderDetail();
            orderDetail.order = savedOrder;
            orderDetail.product = product;
            orderDetail.quantity = productData.quantity;
            orderDetail.subtotal = productData.quantity * product.precio;

            await this.orderDetailRepository.save(orderDetail);

            // Reducir el stock del producto
            await this.productService.update(product.id, { stock: product.stock - productData.quantity });
        }

        return savedOrder;
    }

    // Obtener todos los pedidos
    async findAll(): Promise<Order[]> {
        return this.orderRepository.find({ relations: ['orderDetails', 'orderDetails.product'] });
    }

    // Buscar pedido por ID
    async findById(id: number): Promise<Order> {
        return this.orderRepository.findOne({ where: { id }, relations: ['orderDetails', 'orderDetails.product'] });
    }
}
