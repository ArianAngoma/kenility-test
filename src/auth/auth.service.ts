import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthRepository } from './auth.repository';

import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-user-dto';

import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create({ password, ...userData }: CreateUserDto) {
    const passwordEncrypted = bcrypt.hashSync(password, 10);

    try {
      const user = await this.authRepository.create({
        ...userData,
        password: passwordEncrypted,
      });

      return {
        user: {
          _id: user.id,
          fullName: user.fullName,
        },
        token: this.getJwtToken({ userId: user.id }),
      };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async signIn({ email, password }: SignInUserDto) {
    const user = await this.authRepository.findByOneEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid credentials');

    return {
      user: {
        _id: user.id,
        fullName: user.fullName,
      },
      token: this.getJwtToken({ userId: user.id }),
    };
  }

  private handleDBError(error: any): never {
    if (error.code === 11000) {
      throw new BadRequestException({
        message: 'User already exists',
        cause: error.keyValue,
      });
    }

    throw new BadRequestException('Something went wrong');
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
