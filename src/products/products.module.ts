import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

/**
 * Products module
 *
 * This module encapsulates all product-related functionality including
 * controllers, services, and providers for product management.
 *
 * @module ProductsModule
 */
@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // Export service for potential use in other modules
})
export class ProductsModule {}
