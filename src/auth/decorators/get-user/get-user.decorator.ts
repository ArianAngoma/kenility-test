import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from '../../entities/user.entity';

type UserProperties = Partial<Record<keyof User, any>>;

const extractUserProperties = (data: any, user: User) => {
  if (Array.isArray(data)) {
    return data.reduce<UserProperties>(
      (acc, prop) => ({ ...acc, [prop]: user[prop] }),
      {},
    );
  } else if (typeof data === 'string') {
    return { [data]: user[data] };
  } else {
    throw new InternalServerErrorException(
      'Data must be a string or an array of strings',
    );
  }
};

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!user)
    throw new InternalServerErrorException('User not found in request');

  return data ? extractUserProperties(data, user) : user;
});
