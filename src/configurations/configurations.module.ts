import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  providers: [ConfigurationsService],
})
export class ConfigurationsModule {
  static async loadConfigs(configurationsService: ConfigurationsService) {
    const config = await configurationsService.fetchConfig();
    return config;
  }

  static forRoot() {
    return {
      module: ConfigurationsModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [
            async () => {
              const configService = new ConfigurationsService(
                new HttpService(),
              );
              const configs =
                await ConfigurationsModule.loadConfigs(configService);
              return configs;
            },
          ],
        }),
      ],
    };
  }
}
