import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    // Obtener todos los productos
    async findAll(): Promise<Product[]> {
        console.log('Productos buscados');
        return this.productRepository.find();
    }

    // Obtener un producto por su ID
    async findById(id: number): Promise<Product> {
        console.log(`Producto buscado con el id: ${id}`);
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new HttpException(
                `Producto con ID ${id} no encontrado`,
                HttpStatus.NOT_FOUND
            );
        }
        return product;
    }

    // Crear un nuevo producto
    async create(product: Partial<Product>): Promise<Product> {
        const newProduct = this.productRepository.create(product);
        console.log('Producto creado con éxito');
        return this.productRepository.save(newProduct);
    }

    // Actualizar un producto existente
    async update(id: number, productData: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, productData);  // Actualiza el producto
    console.log('Producto actualizado con éxito');
    return this.findById(id); // Retorna el producto actualizado
}


    // Eliminar un producto
    async remove(id: number): Promise<void> {
        const product = await this.findById(id);
        if (!product) {
            throw new HttpException(
                `Producto con ID ${id} no encontrado para eliminar`,
                HttpStatus.NOT_FOUND
            );
        }
        await this.productRepository.delete(id);
        console.log(`Producto con ID ${id} eliminado`);
    }
}
