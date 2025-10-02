/**
 * Product entity interface
 *
 * Defines the structure of a product in the system.
 * This interface represents the core product data model.
 *
 * @interface Product
 */
export interface Product {
  /** Unique identifier for the product */
  id: number;

  /** Product name */
  name: string;

  /** Product description */
  description?: string;

  /** Product price in the base currency */
  price: number;

  /** Available stock quantity */
  stock: number;

  /** Product category */
  category: string;

  /** Whether the product is active/available */
  isActive: boolean;

  /** Product creation timestamp */
  createdAt: Date;

  /** Product last update timestamp */
  updatedAt: Date;
}

/**
 * Product creation data interface
 *
 * Defines the data required to create a new product.
 * Excludes auto-generated fields like id, createdAt, and updatedAt.
 *
 * @interface CreateProductData
 */
export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  isActive: boolean;
}

/**
 * Product update data interface
 *
 * Defines the data that can be updated for an existing product.
 * All fields are optional for partial updates.
 *
 * @interface UpdateProductData
 */
export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  isActive?: boolean;
}
