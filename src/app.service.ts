import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { Observable, lastValueFrom } from 'rxjs';
import axios from 'axios';
import { PrayerTimesService } from './prayer-timings.service';
import { getCurrentTimeInCairo } from './utils/get-current-time.util';
import { isTimeGreaterThan } from './utils/is-time-greater-than.util';
const cronExpression: CronExpression = CronExpression.EVERY_10_SECONDS;
@Injectable()
export class AppService {
  constructor(private readonly prayerTimesService: PrayerTimesService) {
    //this.cronExpression = CronExpression.EVERY_10_SECONDS
  }
  private readonly logger = new Logger(AppService.name);
  async getPrayerTimings() {
    const response = await this.prayerTimesService.getPrayerTimings();

    const cairoDate = getCurrentTimeInCairo();
    return { timings: response.timings, currentTimeInCairo: cairoDate };
    //return ;
  }

  @Cron(cronExpression)
  async handleCron() {
    await this.checkPrayerTime();
  }
  // Method to check if the current time is greater than prayer time + 15 minutes
  async checkPrayerTime(): Promise<void> {
    this.logger.debug(`checkPrayerTime  Called ${cronExpression}`);
    try {
      // Get prayer timings and current time
      const { timings, currentTimeInCairo } = await this.getPrayerTimings();

      // Check if current time is greater than prayer time + 15 minutes
      Object.keys(timings).forEach((prayer) => {
        const isTimeGreaterThan15 = isTimeGreaterThan(
          timings[prayer],
          currentTimeInCairo,
        );
        if (isTimeGreaterThan15) {
          // Log a message if the condition is met
          this.logger.log(`Did you pray the Sunnah of ${prayer}!`);
        }
      });
    } catch (error) {
      // Handle errors if any
      this.logger.error(`Error checking prayer time: ${error.message}`);
    }
  }
}
