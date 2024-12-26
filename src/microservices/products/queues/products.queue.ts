import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from '../services/product.service'; 

@Injectable()
export class ProductsQueue {
    constructor(private readonly productService: ProductService) {}

    @EventPattern('product_updated') // Patrón para actualización de productos
    async handleProductUpdated(data: any) {
    console.log('Mensaje recibido en products_queue:', data);
    const { id, changes } = data;
    await this.productService.update(id, changes);
    }
}
