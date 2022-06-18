import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MachineModule } from './modules/machine/machine.module';
import configs from './config';
import { DatabaseModule } from './core/loaders/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthMiddleware } from './core/middlewares/auth.middleware';
import { JwtService } from './core/helpers';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MachineModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // global config files
      load: configs,
    }),
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(...this.configService.get('routes').publicRoutes)
      .forRoutes('*');
  }
}
