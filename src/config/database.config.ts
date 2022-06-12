import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri: process.env.DATABASE_URI || 'mongodb://localhost/barista-machine',
}));
