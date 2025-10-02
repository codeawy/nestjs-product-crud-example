import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

/**
 * Root application module
 *
 * This module serves as the entry point for the NestJS application.
 * It imports all feature modules and configures global providers.
 *
 * @module AppModule
 */
@Module({
  imports: [
    ProductsModule,
    // Add other feature modules here as the application grows
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
