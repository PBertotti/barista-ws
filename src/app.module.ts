import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MachineModule } from './modules/machine/machine.module';
import configs from './config';
import { DatabaseModule } from './core/loaders/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthMiddleware } from './core/middlewares/auth.middleware';
import { JwtService } from './core/helpers';

@Module({
  imports: [
    MachineModule,
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true, // global config files
      load: configs,
    }),
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth').forRoutes('*');
  }
}
