# Mastering NestJS - Product Management API

A comprehensive NestJS application demonstrating best practices for building scalable, maintainable APIs with proper documentation, validation, and modular architecture.

## 🚀 Quick Start

### Prerequisites

- Node.js (v20 or higher) - [Download from official website](https://nodejs.org/)
- TypeScript knowledge

### Installation

#### 1. Install pnpm (Package Manager)

First, install pnpm globally using npm:

```bash
npm install -g pnpm
```

#### 2. Install NestJS CLI

Install the NestJS CLI globally using pnpm:

```bash
pnpm add -g @nestjs/cli
```

#### 3. Clone and Setup Project

```bash
# Clone the repository
git clone <repository-url>
cd mastering-nestjs

# Install project dependencies
pnpm install
```

#### Alternative: Create New NestJS Project

If you want to create a new NestJS project from scratch:

```bash
# Create a new NestJS project
nest new my-nestjs-app

# When prompted, choose pnpm as the package manager
# Navigate to the project directory
cd my-nestjs-app
```

#### 4. Start Development Server

```bash
# Start with hot reload (recommended for development)
pnpm run start:dev

# Alternative: Start without hot reload
pnpm run start
```

> **Note**: The application will be available at `http://localhost:3000` by default.

#### 5. Verify Installation

Verify that everything is working correctly:

```bash
# Check Node.js version (should be v20 or higher)
node --version

# Check pnpm version
pnpm --version

# Check NestJS CLI version
nest --version

# Test the application
curl http://localhost:3000/api/v1
```

#### Troubleshooting

**Common Issues:**

- **Port already in use**: If port 3000 is occupied, set a different port:
  ```bash
  PORT=3001 pnpm run start:dev
  ```

- **Permission errors**: On Unix systems, you might need `sudo` for global installations:
  ```bash
  sudo npm install -g pnpm
  sudo pnpm add -g @nestjs/cli
  ```

- **Node.js version**: Ensure you're using Node.js v20 or higher. Use a version manager like [nvm](https://github.com/nvm-sh/nvm) if needed.

### Access the Application

- **API Base URL**: http://localhost:3000/api/v1
- **Health Check**: http://localhost:3000/api/v1
- **Products API**: http://localhost:3000/api/v1/products

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

- **[Project Overview](docs/README.md)** - Complete project documentation
- **[API Documentation](docs/API.md)** - Detailed API reference
- **[Architecture Guide](docs/ARCHITECTURE.md)** - System architecture and design patterns

## ✨ Features

- **Product Management**: Full CRUD operations for products
- **Advanced Filtering**: Search, category filtering, and price range filtering
- **Pagination**: Efficient data pagination with metadata
- **Sorting**: Multi-field sorting capabilities
- **Validation**: Comprehensive input validation and error handling
- **Type Safety**: Strong typing throughout the application
- **Documentation**: Self-documenting code with JSDoc comments
- **Logging**: Structured logging for debugging and monitoring

## 🏗️ Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts          # Root application module
├── app.controller.ts      # Root controller with health checks
├── app.service.ts         # Root service
└── products/              # Products feature module
    ├── products.module.ts     # Products module configuration
    ├── products.controller.ts # Products REST API endpoints
    ├── products.service.ts    # Products business logic
    ├── interfaces/            # Type definitions
    │   ├── product.interface.ts
    │   └── api-response.interface.ts
    └── dto/                   # Data Transfer Objects
        ├── create-product.dto.ts
        ├── update-product.dto.ts
        └── query-product.dto.ts
```

## 🛠️ Available Scripts

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

## 📖 API Examples

### Get All Products with Filtering

```bash
curl "http://localhost:3000/api/v1/products?page=1&limit=5&category=Electronics&minPrice=100&maxPrice=1000&search=laptop&sortBy=price&order=ASC"
```

### Create a New Product

```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "description": "A test product for demonstration",
    "price": 99.99,
    "stock": 25,
    "category": "Electronics",
    "isActive": true
  }'
```

### Update a Product

```bash
curl -X PATCH http://localhost:3000/api/v1/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 149.99, "stock": 20}'
```

### Delete a Product

```bash
curl -X DELETE http://localhost:3000/api/v1/products/1
```

## 🏛️ Architecture Highlights

### Design Patterns

- **Module Pattern**: Feature-based modular architecture
- **Controller-Service Pattern**: Separation of HTTP and business concerns
- **DTO Pattern**: Type-safe data transfer objects
- **Repository Pattern**: Data access abstraction

### Best Practices

- **SOLID Principles**: Single responsibility, dependency inversion
- **Type Safety**: Full TypeScript implementation
- **Validation**: Comprehensive input validation
- **Error Handling**: Consistent error responses
- **Logging**: Structured logging throughout
- **Documentation**: Extensive JSDoc comments

## 🔧 Configuration

### Environment Variables

Create a `.env` file for configuration:

```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=*
```

### Global Configuration

The application includes:

- **Global Validation Pipe**: Automatic request validation
- **CORS Support**: Cross-origin request handling
- **API Versioning**: Global API prefix `/api/v1`
- **Graceful Shutdown**: Proper signal handling

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

### Docker Support

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "start:prod"]
```

## 📈 Performance Features

- **Pagination**: Efficient data pagination
- **Caching**: Product details cached for 5 minutes
- **Filtering**: In-memory filtering (easily replaceable with database)
- **Sorting**: Optimized sorting algorithms

## 🔒 Security Features

- **Input Validation**: All inputs validated using DTOs
- **Type Safety**: Strong typing prevents runtime errors
- **Error Handling**: Secure error messages
- **CORS Configuration**: Configurable cross-origin policies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Add JSDoc comments to all public methods
- Write tests for new functionality
- Ensure all tests pass
- Update documentation as needed

## 📄 License

This project is licensed under the UNLICENSED License.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Class Validator](https://github.com/typestack/class-validator) - Validation library
- [Class Transformer](https://github.com/typestack/class-transformer) - Transformation library

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check the [documentation](docs/README.md)
- Review the [API reference](docs/API.md)

---

**Built with ❤️ using NestJS and TypeScript**