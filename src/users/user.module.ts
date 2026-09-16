import { Module } from '@nestjs/common';
import { UsersService } from './user.service.js';
import { UsersController } from './user.controller.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}