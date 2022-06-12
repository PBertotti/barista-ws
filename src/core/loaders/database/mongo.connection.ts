import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export default MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => ({
    uri: config.get('database.uri'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
  inject: [ConfigService],
});
