import { RequestMethod } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export default registerAs('routes', () => ({
  publicRoutes: [
    { path: '/auth/login', method: RequestMethod.POST },
    { path: '/user', method: RequestMethod.POST },
  ],
}));
