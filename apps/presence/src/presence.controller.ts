import { Controller, Get } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { SharedService } from '@app/shared';

@Controller()
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @Get()
  getHello(): string {
    return this.presenceService.getHello();
  }
}
