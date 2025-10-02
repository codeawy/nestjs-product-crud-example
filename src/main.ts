import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

/**
 * Bootstrap the NestJS application
 *
 * This function initializes the application with:
 * - Global validation pipes for request validation
 * - CORS configuration
 * - Global prefix for API routes
 * - Graceful shutdown handling
 *
 * @returns Promise<void>
 */
async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);

    // Global validation pipe configuration
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Strip properties that don't have decorators
        forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
        transform: true, // Automatically transform payloads to DTO instances
        transformOptions: {
          enableImplicitConversion: true, // Enable implicit type conversion
        },
      }),
    );

    // Enable CORS for cross-origin requests
    app.enableCors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Set global API prefix
    app.setGlobalPrefix('api/v1');

    const port = process.env.PORT || 3000;
    await app.listen(port);

    logger.log(`🚀 Application is running on: http://localhost:${port}/api/v1`);
  } catch (error) {
    logger.error('❌ Error starting the application:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  const logger = new Logger('GracefulShutdown');
  logger.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  const logger = new Logger('GracefulShutdown');
  logger.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

void bootstrap();
