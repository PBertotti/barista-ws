import { registerAs } from '@nestjs/config';

export default registerAs('constants', () => ({
  secret_key: process.env.SECRET_KEY || 'SENhaSUperSEcreTA',
  backend_app_name: process.env.BACKEND_APP_NAME || 'Barista backend',
  frontend_app_name:
    process.env.FRONTEND_APP_NAME || 'Barista client application',
}));
