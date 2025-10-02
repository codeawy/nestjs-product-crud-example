import { IsNumber, IsString, IsOptional, IsIn, Min, Max, IsEnum, IsPositive } from 'class-validator';
import { Transform, Type } from 'class-transformer';

/**
 * Data Transfer Object for product query parameters
 *
 * This DTO defines the structure and validation rules for product search,
 * filtering, pagination, and sorting parameters.
 *
 * @class QueryProductDto
 */
export class QueryProductDto {
  /**
   * Page number for pagination
   * @example 1
   */
  @IsNumber({}, { message: 'Page must be a number' })
  @IsOptional()
  @Type(() => Number)
  @IsPositive({ message: 'Page must be a positive number' })
  @Min(1, { message: 'Page must be at least 1' })
  @Max(1000, { message: 'Page cannot exceed 1000' })
  page?: number = 1;

  /**
   * Number of items per page
   * @example 10
   */
  @IsNumber({}, { message: 'Limit must be a number' })
  @IsOptional()
  @Type(() => Number)
  @IsPositive({ message: 'Limit must be a positive number' })
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit cannot exceed 100' })
  limit?: number = 10;

  /**
   * Filter by product category
   * @example "Electronics"
   */
  @IsString({ message: 'Category must be a string' })
  @IsOptional()
  @Transform(({ value }) => value?.trim().toLowerCase())
  category?: string;

  /**
   * Minimum price filter
   * @example 100
   */
  @IsNumber({}, { message: 'MinPrice must be a number' })
  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: 'MinPrice cannot be negative' })
  @Max(999999.99, { message: 'MinPrice cannot exceed 999,999.99' })
  minPrice?: number;

  /**
   * Maximum price filter
   * @example 1000
   */
  @IsNumber({}, { message: 'MaxPrice must be a number' })
  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: 'MaxPrice cannot be negative' })
  @Max(999999.99, { message: 'MaxPrice cannot exceed 999,999.99' })
  maxPrice?: number;

  /**
   * Search term for name, description, or category
   * @example "laptop"
   */
  @IsString({ message: 'Search must be a string' })
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  search?: string;

  /**
   * Field to sort by
   * @example "price"
   */
  @IsString({ message: 'SortBy must be a string' })
  @IsOptional()
  @IsIn(['name', 'price', 'createdAt', 'stock'], {
    message: 'SortBy must be one of: name, price, createdAt, stock',
  })
  sortBy?: 'name' | 'price' | 'createdAt' | 'stock' = 'createdAt';

  /**
   * Sort order
   * @example "DESC"
   */
  @IsString({ message: 'Order must be a string' })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'], { message: 'Order must be either ASC or DESC' })
  order?: 'ASC' | 'DESC' = 'DESC';
}
