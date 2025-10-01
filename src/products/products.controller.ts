import { Controller, Get } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ============================================
  // GET ALL PRODUCTS WITH FILTERING & PAGINATION
  // ============================================
  /**
   * GET /products
   * GET /products?page=1&limit=10
   * GET /products?category=Electronics
   * GET /products?minPrice=50&maxPrice=500
   * GET /products?search=laptop
   * GET /products?sortBy=price&order=DESC
   */
  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }
}
