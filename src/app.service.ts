import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello() {
    return new Date(Date.now());
  }

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    this.logger.debug('Called EVERY_MINUTE');
  }
}
