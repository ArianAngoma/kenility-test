import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { EnvConfigService } from '../../env-config/env-config.service';

import { User } from '../entities/user.entity';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly envConfigService: EnvConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {
    super({
      secretOrKey: envConfigService.getEnvVariable('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate({ userId }: JwtPayload): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) throw new UnauthorizedException('Unauthorized');

    return user;
  }
}
