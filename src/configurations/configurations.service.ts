import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ConfigurationsService {
  private readonly logger = new Logger(ConfigurationsService.name);

  constructor(private readonly httpService: HttpService) {}
  async fetchConfig() {
    try {
      const response = await lastValueFrom(
        this.httpService.get('http://demo1392769.mockable.io/configs'),
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch config', error);
      throw new Error('Failed to fetch config');
    }
  }
}
