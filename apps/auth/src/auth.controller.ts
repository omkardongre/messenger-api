import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'get-users' })
  async addSubscriber(@Ctx() context: RmqContext) {
    const message = context.getMessage();
    const channel = context.getChannelRef();
    channel.ack(message);
    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'post-user' })
  async postUser(@Ctx() context: RmqContext) {
    const message = context.getMessage();
    const channel = context.getChannelRef();
    channel.ack(message);
    return this.authService.postUser();
  }
}
