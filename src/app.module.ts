import { Module } from '@nestjs/common';

import { ConfigurationsModule } from './configurations/configurations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigurationsModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigurationsModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('database.mongodb.url'),
          dbName: configService.get('database.mongodb.dbname'),
        };
      },
    }),
  ],
})
export class AppModule {}
