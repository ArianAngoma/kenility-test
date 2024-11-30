import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { AuthRepository } from './auth.repository';

import { EnvConfigService } from '../env-config/env-config.service';

import { User, UserSchema } from './entities/user.entity';

import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: (envConfigService: EnvConfigService) => ({
        secret: envConfigService.getEnvVariable('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [EnvConfigService],
    }),
  ],
  exports: [PassportModule, JwtModule, JwtStrategy],
})
export class AuthModule {}
