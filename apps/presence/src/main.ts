import { NestFactory } from '@nestjs/core';
import { PresenceModule } from './presence.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PresenceModule);
  const configService = app.get(ConfigService);
  const USER = configService.get('RABBITMQ_USER');
  const PASSWORD = configService.get('RABBITMQ_PASSWORD');
  const HOST = configService.get('RABBITMQ_HOST');
  const QUEUE = configService.get('RABBITMQ_PRESENCE_QUEUE');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
      queue: QUEUE,
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
