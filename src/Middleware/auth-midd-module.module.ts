import { Module } from '@nestjs/common';
import { AuthMiddleware } from './authMiddleware';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports:[
        ClientsModule.register([
            { 
              name: 'NAT_Service', 
              transport: Transport.NATS,
              options: {
                servers: ['nats://157.245.92.194:4222'],
                maxReconnectAttempts: -1
              },
            },
        ])
    ],
    providers:[AuthMiddleware],
    exports: [ClientsModule]
})
export class AuthMiddModuleModule {}
