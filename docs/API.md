# API Documentation

## Overview

This document provides comprehensive API documentation for the Mastering NestJS Product Management API.

## Base Information

- **Base URL**: `http://localhost:3000`
- **API Version**: 1.0
- **Content Type**: `application/json`
- **Authentication**: None (for this demo)

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details",
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Products API

### Data Models

#### Product
```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Create Product DTO
```typescript
interface CreateProductDto {
  name: string;           // Required, string
  description?: string;   // Optional, 10-100 characters
  price: number;          // Required, minimum 0
  stock: number;          // Required, minimum 0
  category: string;       // Required, string
  isActive: boolean;      // Required, boolean
}
```

#### Update Product DTO
```typescript
interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  isActive?: boolean;
}
```

#### Query Parameters DTO
```typescript
interface QueryProductDto {
  page?: number;          // Minimum 1, default 1
  limit?: number;         // Minimum 1, default 10
  category?: string;      // Filter by category
  minPrice?: number;      // Minimum price filter
  maxPrice?: number;      // Maximum price filter
  search?: string;        // Search term
  sortBy?: 'name' | 'price' | 'createdAt';  // Sort field
  order?: 'ASC' | 'DESC'; // Sort order
}
```

## Endpoints

### 1. Get All Products

Retrieve a paginated list of products with optional filtering and sorting.

**Endpoint**: `GET /products`

**Headers**:
- `X-API-Version: 1.0`
- `x-powered-by: NestJS`

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | number | No | 1 | Page number |
| limit | number | No | 10 | Items per page |
| category | string | No | - | Filter by category |
| minPrice | number | No | - | Minimum price |
| maxPrice | number | No | - | Maximum price |
| search | string | No | - | Search term |
| sortBy | string | No | createdAt | Sort field |
| order | string | No | DESC | Sort order |

**Example Request**:
```http
GET /products?page=1&limit=5&category=Laptop&minPrice=100&maxPrice=500&search=Macbook&sortBy=price&order=ASC
```

**Example Response**:
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Macbook Pro",
      "description": "Macbook Pro description",
      "price": 300,
      "stock": 30,
      "category": "Laptop",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "itemPerPage": 5,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  },
  "filters": {
    "category": "Laptop",
    "priceRange": {
      "min": 100,
      "max": 500
    },
    "search": "Macbook"
  }
}
```

### 2. Get Product by ID

Retrieve a specific product by its ID.

**Endpoint**: `GET /products/:id`

**Headers**:
- `Cache-Control: public, max-age=300`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Product ID |

**Example Request**:
```http
GET /products/1
```

**Example Response**:
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": 1,
    "name": "Product 1",
    "description": "Product 1 description",
    "price": 100,
    "stock": 10,
    "category": "Category 1",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid product ID format
- `404 Not Found`: Product not found

### 3. Get Products by Category

Retrieve all active products in a specific category.

**Endpoint**: `GET /products/category/:categoryName`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| categoryName | string | Yes | Category name (case-insensitive) |

**Example Request**:
```http
GET /products/category/Laptop
```

**Example Response**:
```json
{
  "success": true,
  "message": "Products in category 'Laptop' retrieved successfully",
  "category": "Laptop",
  "data": [
    {
      "id": 3,
      "name": "Macbook Pro",
      "description": "Macbook Pro description",
      "price": 300,
      "stock": 30,
      "category": "Laptop",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 4. Create Product

Create a new product.

**Endpoint**: `POST /products`

**Headers**:
- `Content-Type: application/json`
- `X-API-Version: 1.0`
- `x-powered-by: NestJS`

**Request Body**:
```json
{
  "name": "New Product",
  "description": "Product description (optional, 10-100 characters)",
  "price": 299.99,
  "stock": 50,
  "category": "Electronics",
  "isActive": true
}
```

**Validation Rules**:
- `name`: Required, string
- `description`: Optional, string, 10-100 characters
- `price`: Required, number, minimum 0
- `stock`: Required, number, minimum 0
- `category`: Required, string
- `isActive`: Required, boolean

**Example Response**:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 5,
    "name": "New Product",
    "description": "Product description",
    "price": 299.99,
    "stock": 50,
    "category": "Electronics",
    "isActive": true
  }
}
```

**Error Responses**:
- `400 Bad Request`: Validation errors

### 5. Update Product

Partially update an existing product.

**Endpoint**: `PATCH /products/:id`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Product ID |

**Request Body** (all fields optional):
```json
{
  "price": 349.99,
  "stock": 45,
  "isActive": false
}
```

**Example Response**:
```json
{
  "success": true,
  "message": "Product partially updated successfully",
  "updatedFields": ["price", "stock", "isActive"],
  "data": {
    "id": 1,
    "name": "Product 1",
    "description": "Product 1 description",
    "price": 349.99,
    "stock": 45,
    "category": "Category 1",
    "isActive": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid product ID or validation errors
- `404 Not Found`: Product not found

### 6. Delete Product

Delete a product by ID.

**Endpoint**: `DELETE /products/:id`

**Headers**:
- `X-API-Version: 1.0`
- `x-powered-by: NestJS`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | Product ID |

**Example Request**:
```http
DELETE /products/1
```

**Example Response**:
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "id": 1,
    "name": "Product 1",
    "description": "Product 1 description",
    "price": 100,
    "stock": 10,
    "category": "Category 1",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Error Responses**:
- `404 Not Found`: Product not found

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

## Rate Limiting

Currently, no rate limiting is implemented. In production, consider implementing rate limiting to prevent abuse.

## Caching

- Product details are cached for 5 minutes (300 seconds)
- Use appropriate cache headers for better performance

## Examples

### Complete CRUD Workflow

1. **Create a product**:
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "A test product for demonstration",
    "price": 99.99,
    "stock": 25,
    "category": "Test",
    "isActive": true
  }'
```

2. **Get all products**:
```bash
curl http://localhost:3000/products
```

3. **Get product by ID**:
```bash
curl http://localhost:3000/products/1
```

4. **Update product**:
```bash
curl -X PATCH http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 149.99, "stock": 20}'
```

5. **Delete product**:
```bash
curl -X DELETE http://localhost:3000/products/1
```

### Advanced Filtering Examples

1. **Search and filter**:
```bash
curl "http://localhost:3000/products?search=laptop&category=Electronics&minPrice=100&maxPrice=1000&sortBy=price&order=ASC"
```

2. **Pagination**:
```bash
curl "http://localhost:3000/products?page=2&limit=5"
```

3. **Category filtering**:
```bash
curl "http://localhost:3000/products/category/Laptop"
```
