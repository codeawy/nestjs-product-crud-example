import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Product, CreateProductData, UpdateProductData } from './interfaces/product.interface';
import { QueryProductDto } from './dto/query-product.dto';

/**
 * Service for managing products
 *
 * This service handles all business logic related to products including
 * CRUD operations, filtering, searching, and pagination.
 *
 * @class ProductsService
 */
@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  private nextId = 5; // Track next available ID

  // In-memory database (in real app, this would be a database service)
  private products: Product[] = [
    {
      id: 1,
      name: 'MacBook Pro 16-inch',
      description: 'High-performance laptop with M2 Pro chip, perfect for professionals and creatives',
      price: 2499.99,
      stock: 15,
      category: 'Electronics',
      isActive: true,
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z'),
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with titanium design and advanced camera system',
      price: 999.99,
      stock: 25,
      category: 'Electronics',
      isActive: true,
      createdAt: new Date('2024-01-02T00:00:00.000Z'),
      updatedAt: new Date('2024-01-02T00:00:00.000Z'),
    },
    {
      id: 3,
      name: 'Samsung Galaxy S24',
      description: 'Android flagship with AI-powered features and stunning display',
      price: 899.99,
      stock: 0,
      category: 'Electronics',
      isActive: false,
      createdAt: new Date('2024-01-03T00:00:00.000Z'),
      updatedAt: new Date('2024-01-03T00:00:00.000Z'),
    },
    {
      id: 4,
      name: 'Dell XPS 13',
      description: 'Ultra-portable laptop with premium build quality and long battery life',
      price: 1299.99,
      stock: 8,
      category: 'Electronics',
      isActive: true,
      createdAt: new Date('2024-01-04T00:00:00.000Z'),
      updatedAt: new Date('2024-01-04T00:00:00.000Z'),
    },
  ];

  /**
   * Find all products with optional filtering and pagination
   *
   * @param query - Query parameters for filtering, pagination, and sorting
   * @returns Array of products matching the query criteria
   * @example
   * const products = await productsService.findAll({ page: 1, limit: 10, category: 'Electronics' });
   */
  findAll(query?: QueryProductDto): Product[] {
    this.logger.log(`Finding products with query: ${JSON.stringify(query)}`);

    let filteredProducts = [...this.products];

    // Apply filters if provided
    if (query) {
      filteredProducts = this.applyFilters(filteredProducts, query);
      filteredProducts = this.applySorting(filteredProducts, query);
    }

    return filteredProducts;
  }

  /**
   * Find a product by its ID
   *
   * @param id - Product ID
   * @returns Product if found
   * @throws NotFoundException if product not found
   * @example
   * const product = await productsService.findById(1);
   */
  findById(id: number): Product {
    this.logger.log(`Finding product with ID: ${id}`);

    const product = this.products.find(p => p.id === id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  /**
   * Find products by category
   *
   * @param category - Category name
   * @param activeOnly - Whether to return only active products
   * @returns Array of products in the specified category
   * @example
   * const products = await productsService.findByCategory('Electronics', true);
   */
  findByCategory(category: string, activeOnly: boolean = true): Product[] {
    this.logger.log(`Finding products in category: ${category}, activeOnly: ${activeOnly}`);

    let filteredProducts = this.products.filter(p => p.category.toLowerCase() === category.toLowerCase());

    if (activeOnly) {
      filteredProducts = filteredProducts.filter(p => p.isActive);
    }

    return filteredProducts;
  }

  /**
   * Create a new product
   *
   * @param createProductData - Product data for creation
   * @returns Created product with generated ID and timestamps
   * @example
   * const newProduct = await productsService.create({
   *   name: 'New Product',
   *   description: 'Product description',
   *   price: 99.99,
   *   stock: 10,
   *   category: 'Electronics',
   *   isActive: true
   * });
   */
  create(createProductData: CreateProductData): Product {
    this.logger.log(`Creating new product: ${createProductData.name}`);

    const now = new Date();
    const newProduct: Product = {
      id: this.nextId++,
      ...createProductData,
      createdAt: now,
      updatedAt: now,
    };

    this.products.push(newProduct);
    this.logger.log(`Product created with ID: ${newProduct.id}`);

    return newProduct;
  }

  /**
   * Update an existing product
   *
   * @param id - Product ID
   * @param updateData - Partial product data to update
   * @returns Updated product
   * @throws NotFoundException if product not found
   * @example
   * const updatedProduct = await productsService.update(1, { price: 199.99, stock: 5 });
   */
  update(id: number, updateData: UpdateProductData): Product {
    this.logger.log(`Updating product with ID: ${id}`);

    const productIndex = this.products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updatedProduct: Product = {
      ...this.products[productIndex],
      ...updateData,
      updatedAt: new Date(),
    };

    this.products[productIndex] = updatedProduct;
    this.logger.log(`Product updated: ${updatedProduct.name}`);

    return updatedProduct;
  }

  /**
   * Delete a product by ID
   *
   * @param id - Product ID
   * @returns Deleted product
   * @throws NotFoundException if product not found
   * @example
   * const deletedProduct = await productsService.delete(1);
   */
  delete(id: number): Product {
    this.logger.log(`Deleting product with ID: ${id}`);

    const productIndex = this.products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const deletedProduct = this.products[productIndex];
    this.products.splice(productIndex, 1);

    this.logger.log(`Product deleted: ${deletedProduct.name}`);

    return deletedProduct;
  }

  /**
   * Get total count of products
   *
   * @param query - Optional query parameters for filtering
   * @returns Total count of products matching the query
   * @example
   * const count = await productsService.getCount({ category: 'Electronics' });
   */
  getCount(query?: QueryProductDto): number {
    if (!query) {
      return this.products.length;
    }

    const filteredProducts = this.applyFilters([...this.products], query);
    return filteredProducts.length;
  }

  /**
   * Apply filters to products array
   *
   * @private
   * @param products - Array of products to filter
   * @param query - Query parameters containing filters
   * @returns Filtered array of products
   */
  private applyFilters(products: Product[], query: QueryProductDto): Product[] {
    let filteredProducts = [...products];

    // Category filter
    if (query.category) {
      filteredProducts = filteredProducts.filter(p => p.category.toLowerCase().includes(query.category!.toLowerCase()));
    }

    // Price range filter
    if (query.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= query.minPrice!);
    }

    if (query.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= query.maxPrice!);
    }

    // Search filter
    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower),
      );
    }

    return filteredProducts;
  }

  /**
   * Apply sorting to products array
   *
   * @private
   * @param products - Array of products to sort
   * @param query - Query parameters containing sort options
   * @returns Sorted array of products
   */
  private applySorting(products: Product[], query: QueryProductDto): Product[] {
    const { sortBy = 'createdAt', order = 'DESC' } = query;

    return products.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      // Handle date sorting
      if (sortBy === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Handle string sorting (case-insensitive)
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (order === 'ASC') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  }
}
