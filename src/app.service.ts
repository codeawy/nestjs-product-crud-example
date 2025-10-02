import { Injectable } from '@nestjs/common';

/**
 * Root application service
 *
 * This service provides basic application-level functionality
 * and serves as a placeholder for global business logic.
 *
 * @class AppService
 */
@Injectable()
export class AppService {
  /**
   * Get a welcome message
   *
   * @returns {string} Welcome message
   * @example
   * const message = appService.getHello();
   * // Returns: "Hello World!"
   */
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Get application status information
   *
   * @returns {Object} Application status details
   * @example
   * const status = appService.getStatus();
   * // Returns: { status: "running", uptime: 12345, version: "0.0.1" }
   */
  getStatus(): { status: string; uptime: number; version: string } {
    return {
      status: 'running',
      uptime: process.uptime(),
      version: '0.0.1',
    };
  }
}
