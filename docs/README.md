# Mastering NestJS - Product Management API

A comprehensive NestJS application demonstrating best practices for building scalable, maintainable APIs with proper documentation, validation, and modular architecture.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [Coding Standards](#coding-standards)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)
- [Deployment](#deployment)

## 🎯 Overview

This project showcases a production-ready NestJS application with:

- **Modular Architecture**: Clean separation of concerns with feature-based modules
- **Comprehensive Validation**: Request validation using class-validator and DTOs
- **Type Safety**: Full TypeScript implementation with strict typing
- **Documentation**: Extensive JSDoc comments and API documentation
- **Best Practices**: Following NestJS conventions and SOLID principles

## ✨ Features

- **Product Management**: Full CRUD operations for products
- **Advanced Filtering**: Search, category filtering, and price range filtering
- **Pagination**: Efficient data pagination with metadata
- **Sorting**: Multi-field sorting capabilities
- **Validation**: Comprehensive input validation and error handling
- **Type Safety**: Strong typing throughout the application
- **Documentation**: Self-documenting code with JSDoc comments

## 🏗️ Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts          # Root application module
├── app.controller.ts      # Root controller (currently empty)
├── app.service.ts         # Root service
└── products/              # Products feature module
    ├── products.module.ts     # Products module configuration
    ├── products.controller.ts # Products REST API endpoints
    ├── products.service.ts    # Products business logic
    ├── interfaces/            # Type definitions
    │   └── product.interface.ts
    └── dto/                   # Data Transfer Objects
        ├── create-product.dto.ts
        ├── update-product.dto.ts
        └── query-product.dto.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or pnpm
- TypeScript knowledge

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mastering-nestjs
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm start:dev
   # or
   npm run start:dev
   ```

4. **Access the application**
   - API: http://localhost:3000
   - Health check: http://localhost:3000/products

### Available Scripts

```bash
# Development
pnpm start:dev          # Start with hot reload
pnpm start:debug        # Start with debugging

# Production
pnpm build              # Build the application
pnpm start:prod         # Start production server

# Code Quality
pnpm lint               # Run ESLint
pnpm format             # Format code with Prettier

# Testing
pnpm test               # Run unit tests
pnpm test:watch         # Run tests in watch mode
pnpm test:cov           # Run tests with coverage
pnpm test:e2e           # Run end-to-end tests
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Products API

#### Get All Products
```http
GET /products
```

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)
- `category` (string, optional): Filter by category
- `minPrice` (number, optional): Minimum price filter
- `maxPrice` (number, optional): Maximum price filter
- `search` (string, optional): Search in name, description, or category
- `sortBy` (string, optional): Sort field (name, price, createdAt)
- `order` (string, optional): Sort order (ASC, DESC)

**Example:**
```http
GET /products?page=1&limit=5&category=Laptop&minPrice=100&maxPrice=500&search=Macbook&sortBy=price&order=ASC
```

#### Get Product by ID
```http
GET /products/:id
```

#### Get Products by Category
```http
GET /products/category/:categoryName
```

#### Create Product
```http
POST /products
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 299.99,
  "stock": 50,
  "category": "Electronics",
  "isActive": true
}
```

#### Update Product
```http
PATCH /products/:id
Content-Type: application/json

{
  "price": 349.99,
  "stock": 45
}
```

#### Delete Product
```http
DELETE /products/:id
```

## 🏛️ Architecture

### Module Structure

The application follows NestJS's modular architecture:

1. **AppModule**: Root module that imports feature modules
2. **ProductsModule**: Feature module containing all product-related functionality

### Dependency Injection

The application uses NestJS's built-in dependency injection system:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and data access
- **DTOs**: Define data transfer objects with validation
- **Interfaces**: Define TypeScript type contracts

### Design Patterns

- **Repository Pattern**: Service layer abstracts data access
- **DTO Pattern**: Data transfer objects for API contracts
- **Validation Pattern**: Input validation using decorators
- **Response Pattern**: Consistent API response structure

## 📝 Coding Standards

### TypeScript Conventions

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use explicit return types for public methods
- Implement proper error handling with custom exceptions

### NestJS Conventions

- Use decorators for metadata and configuration
- Follow the module-controller-service pattern
- Implement proper dependency injection
- Use pipes for validation and transformation

### Code Organization

- Group related functionality in modules
- Separate concerns (controllers, services, DTOs)
- Use barrel exports for clean imports
- Follow consistent naming conventions

### Documentation Standards

- Add JSDoc comments to all public methods
- Document parameters, return types, and exceptions
- Include usage examples in documentation
- Maintain up-to-date API documentation

## 🔧 Development Guidelines

### Adding New Features

1. Create a new module for the feature
2. Define interfaces and DTOs
3. Implement service with business logic
4. Create controller with endpoints
5. Add comprehensive tests
6. Update documentation

### Error Handling

- Use NestJS built-in exceptions
- Create custom exception classes when needed
- Provide meaningful error messages
- Log errors appropriately

### Validation

- Use class-validator decorators
- Create specific DTOs for each endpoint
- Validate all input data
- Provide clear validation error messages

### Testing

- Write unit tests for services
- Create integration tests for controllers
- Test error scenarios
- Maintain high test coverage

## 🧪 Testing

### Running Tests

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:cov

# End-to-end tests
pnpm test:e2e
```

### Test Structure

- **Unit Tests**: Test individual services and utilities
- **Integration Tests**: Test controller endpoints
- **E2E Tests**: Test complete user workflows

## 🚀 Deployment

### Production Build

```bash
pnpm build
pnpm start:prod
```

### Environment Variables

Create a `.env` file for production:

```env
PORT=3000
NODE_ENV=production
```

### Docker Support

The application can be containerized using Docker:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## 📖 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Class Validator](https://github.com/typestack/class-validator)
- [Class Transformer](https://github.com/typestack/class-transformer)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the UNLICENSED License.
