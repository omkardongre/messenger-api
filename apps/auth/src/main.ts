import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { SharedService } from '@app/shared';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const sharedService = app.get(SharedService);
  const configService = app.get(ConfigService);
  await app.connectMicroservice(
    sharedService.getRmqOptions(configService.get('RABBITMQ_AUTH_QUEUE')),
  );
  await app.startAllMicroservices();
}
bootstrap();
