import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-user-dto';

import { GetUser } from './decorators/get-user/get-user.decorator';
import { Auth } from './decorators/auth/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('signIn')
  signIn(@Body() signInDto: SignInUserDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('private')
  @Auth()
  testingPrivateRoute(@GetUser() user: User) {
    return user;
  }
}
