import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { Observable, lastValueFrom } from 'rxjs';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(AppService.name);
  async getHello() {
    const response = await axios.get(
      'https://backend.bazaarmyr.com/v1/testDeploy',
    );
    // Assuming the current date and time
    const currentUTCDate = new Date();

    // Set the time zone to Cairo (Egypt Standard Time)
    const options = { timeZone: 'Africa/Cairo' };

    // Format the date according to the user's locale
    // const cairoDate = currentUTCDate.toLocaleString('en-US', options);
    const cairoDate = currentUTCDate.toLocaleString('ar-EG', options);
    return { data: response.data, date: cairoDate };
    //return ;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    this.logger.debug('Called EVERY_MINUTE');
  }
}
