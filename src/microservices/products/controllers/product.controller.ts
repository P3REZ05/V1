import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';

@Controller('products')  
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()  // Ruta para obtener todos los productos
    async findAll(): Promise<Product[]> {
        console.log('Productos obtenidos de la base de datos')
        return this.productService.findAll();
    }


    @Get(':id') //ruta para buscar producto por id
async findById(@Param('id') id: string): Promise<Product> {
    console.log('Producto por id obtenido de la base de datos: ${id}' )
    return this.productService.findById(Number(id));
}


    @Post()  // Ruta para crear un nuevo producto
    async create(@Body() product: Product): Promise<Product> {
        console.log('Producto creado en la base de datos')
        return this.productService.create(product);
    }

    @Patch(':id')  // Ruta para actualizar un producto
    async update(
        @Param('id') id: number,
        @Body() product: Partial<Product>,

    ): Promise<Product> {
        console.log('Producto actualizado en la base de datos')
        return this.productService.update(id, product);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        console.log('Producto eliminado de la base de datos');
        return this.productService.remove(id); 
}

}

