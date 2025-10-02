import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Root application controller
 *
 * This controller handles root-level endpoints and provides
 * basic application information and health checks.
 *
 * @class AppController
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Get application health status and basic information
   *
   * @returns {Object} Application health information
   * @example
   * GET /
   * Response: { message: "Hello World!", status: "healthy", timestamp: "2024-01-01T00:00:00.000Z" }
   */
  @Get()
  getHealth(): { message: string; status: string; timestamp: string } {
    return {
      message: this.appService.getHello(),
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Get application information
   *
   * @returns {Object} Application metadata
   * @example
   * GET /info
   * Response: { name: "mastering-nestjs", version: "0.0.1", environment: "development" }
   */
  @Get('info')
  getAppInfo(): { name: string; version: string; environment: string } {
    return {
      name: 'mastering-nestjs',
      version: '0.0.1',
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
