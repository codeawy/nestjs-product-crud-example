import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';
import { QueryProductDto } from './dto/query-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

interface FindAllResponse {
  success: boolean;
  message: string;
  data: Product[];
  pagination: {
    currentPage: number;
    itemPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters: {
    category: string;
    priceRange: {
      min: number;
      max: number | 'unlimited';
    };
    search: string;
  };
}

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
  @HttpCode(HttpStatus.OK)
  @Header('X-API-Version', '1.0')
  @Header('x-powered-by', 'NestJS')
  findAll(@Query() query: QueryProductDto): FindAllResponse {
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

    // PAGINATION
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Number(page);

    console.log(totalItems);
    // Validate page number
    if (currentPage < 1 || (currentPage > totalPages && totalItems !== 0)) {
      throw new BadRequestException(`Invalid page number, Must be between 1 and ${totalPages}`);
    }

    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + Number(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
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
    };
  }

  // ============================================
  // GET SINGLE PRODUCT BY ID (PATH PARAMETER)
  // ============================================
  /**
   * GET /products/:id
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'public, max-age=300')
  getProductById(@Param('id') id: string) {
    const productId = +id;

    //  Validate ID
    if (isNaN(productId)) {
      throw new BadRequestException('Product Id must be a number');
    }

    // Find product
    const product = this.productsService.findAll().find(p => p.id === productId);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return {
      success: true,
      message: 'Product retrieved successfully',
      data: product,
      timestamp: new Date().toISOString(),
    };
  }

  // ============================================
  // GET PRODUCTS BY CATEGORY (PATH PARAMETER)
  // ============================================
  /**
   * GET /products/category/Electronics
   */

  @Get('category/:categoryName')
  getProductByCategory(@Param('categoryName') categoryName: string) {
    const products = this.productsService
      .findAll()
      .filter(p => p.category.toLowerCase() === categoryName.toLowerCase() && p.isActive);

    return {
      success: true,
      message: `Products in category '${categoryName}' retrieved successfully`,
      category: categoryName,
      data: products,
    };
  }

  // ============================================
  // CREATE NEW PRODUCT
  // ============================================
  /**
   * POST /products
   */
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    const newProduct = { ...createProductDto, id: this.productsService.findAll().length + 1 };

    return {
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    };
  }
}
