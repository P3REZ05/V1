import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('productos')
export class Product {
    @PrimaryGeneratedColumn({ name: 'id_producto' })
    id: number;

    @Column({ name: 'nombre_producto', type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'int' })
    stock: number;

    @CreateDateColumn({ name: 'creado_en', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'actualizado_en', type: 'timestamp' })
    updatedAt: Date;

    @Column({ name: 'precio', type: 'decimal', precision: 10, scale: 2 })
    precio: number;
}