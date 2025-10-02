import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional, Length, Min, Max, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * Data Transfer Object for creating a new product
 *
 * This DTO defines the structure and validation rules for product creation.
 * It ensures data integrity and provides clear API contracts.
 *
 * @class CreateProductDto
 */
export class CreateProductDto {
  /**
   * Product name
   * @example "MacBook Pro 16-inch"
   */
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
  @Transform(({ value }) => (value as string)?.trim())
  name: string;

  /**
   * Product description
   * @example "High-performance laptop with M2 Pro chip"
   */
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  @Length(10, 500, { message: 'Description must be between 10 and 500 characters' })
  @Transform(({ value }) => (value as string)?.trim())
  description?: string;

  /**
   * Product price in base currency
   * @example 2499.99
   */
  @IsNumber({}, { message: 'Price must be a number' })
  @IsNotEmpty({ message: 'Price is required' })
  @IsPositive({ message: 'Price must be a positive number' })
  @Min(0.01, { message: 'Price must be at least 0.01' })
  @Max(999999.99, { message: 'Price cannot exceed 999,999.99' })
  @Transform(({ value }) => parseFloat(value as string))
  price: number;

  /**
   * Available stock quantity
   * @example 50
   */
  @IsNumber({}, { message: 'Stock must be a number' })
  @IsNotEmpty({ message: 'Stock is required' })
  @Min(0, { message: 'Stock cannot be negative' })
  @Max(999999, { message: 'Stock cannot exceed 999,999' })
  @Transform(({ value }) => parseInt(value as string, 10))
  stock: number;

  /**
   * Product category
   * @example "Electronics"
   */
  @IsString({ message: 'Category must be a string' })
  @IsNotEmpty({ message: 'Category is required' })
  @Length(1, 50, { message: 'Category must be between 1 and 50 characters' })
  @Transform(({ value }) => (value as string)?.trim())
  category: string;

  /**
   * Whether the product is active/available
   * @example true
   */
  @IsBoolean({ message: 'isActive must be a boolean value' })
  @IsNotEmpty({ message: 'isActive is required' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  })
  isActive: boolean;
}
