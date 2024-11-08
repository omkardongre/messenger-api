import { AuthGuard } from '@app/shared';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
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

  @UseGuards(AuthGuard)
  @Get('presence')
  async getPresence() {
    return this.presenceClientProxy.send({ cmd: 'get-presence' }, {});
  }

  @Post('auth/register')
  async register(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authClientProxy.send(
      {
        cmd: 'register',
      },
      {
        firstName,
        lastName,
        email,
        password,
      },
    );
  }

  @Post('auth/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authClientProxy.send(
      {
        cmd: 'login',
      },
      {
        email,
        password,
      },
    );
  }
}
