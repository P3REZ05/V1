import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GatewayController } from './controllers/gateway.controller'; 

@Module({
    imports: [HttpModule], // Importar HttpModule para realizar solicitudes a otros servicios
    controllers: [GatewayController], // Registrar el controlador del Gateway
})
export class GatewayModule {}
