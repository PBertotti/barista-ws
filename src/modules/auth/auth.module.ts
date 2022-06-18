import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserSchemaDefinition } from '../user/user.schema';
import { JwtService } from 'src/core/helpers';

@Module({
  imports: [UserSchemaDefinition],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
