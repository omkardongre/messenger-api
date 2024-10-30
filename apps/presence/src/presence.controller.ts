import { Controller, Get } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { SharedService } from '@app/shared';
import { Ctx } from '@nestjs/microservices';
import { MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class PresenceController {
  constructor(
    private readonly presenceService: PresenceService,
    private readonly sharedService: SharedService,
  ) {}

  @Get()
  getHello(): string {
    return this.presenceService.getHello();
  }

  @MessagePattern({ cmd: 'get-presence' })
  getPresence(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);
    return this.presenceService.getHello();
  }
}
