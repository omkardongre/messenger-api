import { NestFactory } from '@nestjs/core';
import { PresenceModule } from './presence.module';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(PresenceModule);
  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);
  await app.connectMicroservice(
    sharedService.getRmqOptions(configService.get('RABBITMQ_PRESENCE_QUEUE')),
  );
  await app.startAllMicroservices();
}
bootstrap();
