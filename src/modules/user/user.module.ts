import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserSchemaDefinition } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [UserModule, UserSchemaDefinition],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, UserSchemaDefinition],
})
export class UserModule {}
