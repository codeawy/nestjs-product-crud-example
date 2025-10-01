import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  // In-memory database (in real app, this would be a database service)
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      stock: 10,
      category: 'Category 1',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Product 2 description',
      price: 200,
      stock: 20,
      category: 'Category 2',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'ZZZ Macbook Pro',
      description: 'Macbook Pro description',
      price: 300,
      stock: 30,
      category: 'Laptop',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findAll(): Product[] {
    return this.products;
  }
}
