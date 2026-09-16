import { Body, Controller, Get , Post , UseGuards, } from '@nestjs/common';
import type { AuthUser } from '../auth/auth-user.js';
import {  CurrentUser } from '../auth/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { LoginUserDto } from '../dto/login-user.dto.js';
import { RegisterUserDto } from '../dto/register-user.dto.js';
import { UsersService } from './user.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() body: RegisterUserDto) {
    return this.usersService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.usersService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: AuthUser) {
    return user;
  }

}