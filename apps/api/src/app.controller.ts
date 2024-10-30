import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authClientProxy: ClientProxy,
    @Inject('PRESENCE_SERVICE') private presenceClientProxy: ClientProxy,
  ) {}

  @Get('auth')
  async getUsers() {
    return this.authClientProxy.send({ cmd: 'get-users' }, {});
  }

  @Post('auth')
  async postUser() {
    return this.authClientProxy.send({ cmd: 'post-user' }, {});
  }

  @Get('presence')
  async getPresence() {
    return this.presenceClientProxy.send({ cmd: 'get-presence' }, {});
  }
}
