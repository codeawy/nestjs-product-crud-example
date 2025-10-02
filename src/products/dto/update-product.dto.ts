import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

/**
 * Data Transfer Object for updating an existing product
 *
 * This DTO extends CreateProductDto with all fields optional,
 * allowing for partial updates of product data.
 *
 * @class UpdateProductDto
 * @extends PartialType<CreateProductDto>
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {
  // All fields from CreateProductDto are now optional
  // This allows for partial updates where only specific fields need to be changed
}
