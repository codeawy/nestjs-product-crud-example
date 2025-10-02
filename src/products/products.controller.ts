import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import type { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';
import type { QueryProductDto } from './dto/query-product.dto';
import type { CreateProductDto } from './dto/create-product.dto';
import type { UpdateProductDto } from './dto/update-product.dto';
import type { ApiResponse, PaginatedApiResponse, ProductUpdateResponse } from './interfaces/api-response.interface';

/**
 * Controller for managing products
 *
 * This controller handles all HTTP requests related to product management,
 * including CRUD operations, filtering, searching, and pagination.
 *
 * @class ProductsController
 */
@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService) {}

  /**
   * Get all products with optional filtering, pagination, and sorting
   *
   * @param query - Query parameters for filtering, pagination, and sorting
   * @returns Paginated response with products and metadata
   * @example
   * GET /products
   * GET /products?page=1&limit=10
   * GET /products?category=Electronics
   * GET /products?minPrice=50&maxPrice=500
   * GET /products?search=laptop
   * GET /products?sortBy=price&order=DESC
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('X-API-Version', '1.0')
  @Header('x-powered-by', 'NestJS')
  findAll(@Query() query: QueryProductDto): PaginatedApiResponse<Product> {
    this.logger.log(`Finding products with query: ${JSON.stringify(query)}`);

    const { page = 1, limit = 10, category, minPrice, maxPrice, search } = query;

    // Get filtered and sorted products from service
    const allProducts = this.productsService.findAll(query);

    // Calculate pagination
    const totalItems = allProducts.length;
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Number(page);

    // Apply pagination
    const startIndex = (currentPage - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    const response: PaginatedApiResponse<Product> = {
      success: true,
      message: 'Products retrieved successfully',
      data: paginatedProducts,
      pagination: {
        currentPage,
        itemPerPage: Number(limit),
        totalItems,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
      filters: {
        category: category || 'all',
        priceRange: {
          min: minPrice || 0,
          max: maxPrice || 'unlimited',
        },
        search: search || 'none',
      },
      timestamp: new Date().toISOString(),
    };

    this.logger.log(`Found ${totalItems} products, returning ${paginatedProducts.length} for page ${currentPage}`);

    return response;
  }

  /**
   * Get a single product by ID
   *
   * @param id - Product ID (parsed as integer)
   * @returns Product data with success response
   * @throws BadRequestException if ID is not a valid number
   * @throws NotFoundException if product is not found
   * @example
   * GET /products/1
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'public, max-age=300')
  getProductById(@Param('id', ParseIntPipe) id: number): ApiResponse<Product> {
    this.logger.log(`Finding product with ID: ${id}`);

    const product = this.productsService.findById(id);

    const response: ApiResponse<Product> = {
      success: true,
      message: 'Product retrieved successfully',
      data: product,
      timestamp: new Date().toISOString(),
    };

    this.logger.log(`Product found: ${product.name}`);

    return response;
  }

  /**
   * Get products by category
   *
   * @param categoryName - Category name (case-insensitive)
   * @returns Array of active products in the specified category
   * @example
   * GET /products/category/Electronics
   */
  @Get('category/:categoryName')
  @HttpCode(HttpStatus.OK)
  getProductByCategory(@Param('categoryName') categoryName: string): ApiResponse<Product[]> & { category: string } {
    this.logger.log(`Finding products in category: ${categoryName}`);

    const products = this.productsService.findByCategory(categoryName, true);

    const response: ApiResponse<Product[]> & { category: string } = {
      success: true,
      message: `Products in category '${categoryName}' retrieved successfully`,
      data: products,
      category: categoryName,
      timestamp: new Date().toISOString(),
    };

    this.logger.log(`Found ${products.length} products in category: ${categoryName}`);

    return response;
  }

  /**
   * Create a new product
   *
   * @param createProductDto - Product data for creation
   * @returns Created product with success response
   * @example
   * POST /products
   * Body: {
   *   "name": "New Product",
   *   "description": "Product description",
   *   "price": 99.99,
   *   "stock": 10,
   *   "category": "Electronics",
   *   "isActive": true
   * }
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('X-API-Version', '1.0')
  @Header('x-powered-by', 'NestJS')
  createProduct(@Body() createProductDto: CreateProductDto): ApiResponse<Product> {
    this.logger.log(`Creating new product: ${createProductDto.name}`);

    const newProduct = this.productsService.create(createProductDto);

    const response: ApiResponse<Product> = {
      success: true,
      message: 'Product created successfully',
      data: newProduct,
      timestamp: new Date().toISOString(),
    };

    this.logger.log(`Product created with ID: ${newProduct.id}`);

    return response;
  }
  /**
   * Partially update an existing product
   *
   * @param id - Product ID (parsed as integer)
   * @param updateProductDto - Partial product data to update
   * @returns Updated product with success response
   * @throws BadRequestException if ID is not a valid number or validation fails
   * @throws NotFoundException if product is not found
   * @example
   * PATCH /products/1
   * Body: { "price": 149.99, "stock": 5 }
   */
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  partialUpdateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): ProductUpdateResponse {
    this.logger.log(`Updating product with ID: ${id}`);

    // Validate price if provided
    if (updateProductDto.price !== undefined && updateProductDto.price <= 0) {
      throw new BadRequestException('Price must be greater than 0');
    }

    const updatedProduct = this.productsService.update(id, updateProductDto);

    const response: ProductUpdateResponse = {
      success: true,
      message: 'Product partially updated successfully',
      data: updatedProduct,
      updatedFields: Object.keys(updateProductDto),
      timestamp: new Date().toISOString(),
    };

    this.logger.log(`Product updated: ${updatedProduct.name}, fields: ${response.updatedFields.join(', ')}`);

    return response;
  }

  /**
   * Delete a product by ID
   *
   * @param id - Product ID (parsed as integer)
   * @returns Deleted product with success response
   * @throws NotFoundException if product is not found
   * @example
   * DELETE /products/1
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Header('X-API-Version', '1.0')
  @Header('x-powered-by', 'NestJS')
  deleteProduct(@Param('id', ParseIntPipe) id: number): ApiResponse<Product> {
    this.logger.log(`Deleting product with ID: ${id}`);

    const deletedProduct = this.productsService.delete(id);

    const response: ApiResponse<Product> = {
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct,
      timestamp: new Date().toISOString(),
    };

    this.logger.log(`Product deleted: ${deletedProduct.name}`);

    return response;
  }
}
