import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MachineModule } from './modules/machine/machine.module';
import configs from './config';
import { DatabaseModule } from './core/loaders/database/database.module';

@Module({
  imports: [
    MachineModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true, // global config files
      load: configs,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
