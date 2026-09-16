import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto.js';
import { UsersService } from './user.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() body: RegisterUserDto) {
    return this.usersService.register(body);
  }
}