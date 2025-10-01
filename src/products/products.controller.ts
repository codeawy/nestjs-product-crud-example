import { Controller, Get, Query } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';
import { QueryProductDto } from './dto/query-product.dto';

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
  findAll(@Query() query: QueryProductDto): { success: boolean; message: string; data: Product[] } {
    const { page = 1, limit = 10, category, minPrice, maxPrice, search, sortBy = 'createdAt', order = 'DESC' } = query;
    let filteredProducts = [...this.productsService.findAll()];

    // ** FILTERING
    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower),
      );
    }

    // SORTING
    filteredProducts.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (order == 'ASC') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return {
      success: true,
      message: 'Products retrieved successfully',
      data: filteredProducts,
    };
  }
}
