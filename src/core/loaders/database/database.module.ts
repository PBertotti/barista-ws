import { Module } from '@nestjs/common';
import MongoConnection from './mongo.connection';

@Module({
  imports: [MongoConnection],
  exports: [MongoConnection],
})
export class DatabaseModule {}
