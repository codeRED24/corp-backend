# Corp Backend

A modern, scalable NestJS backend application with PostgreSQL database integration using Drizzle ORM.

## 🚀 Features

- **NestJS Framework**: Built with the progressive Node.js framework
- **PostgreSQL Database**: Robust relational database integration
- **Drizzle ORM**: Type-safe database operations with excellent TypeScript support
- **User Management**: Complete CRUD operations for user entities
- **Type Safety**: Full TypeScript support with auto-generated database types
- **Testing**: Comprehensive unit and e2e testing setup
- **Code Quality**: ESLint and Prettier configuration for consistent code style

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL database

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd corp-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=corp_backend
PORT=3000
```

4. Generate and run database migrations:

```bash
npm run db:all
```

## 🚀 Running the Application

### Development Mode

```bash
npm run start:dev
```

The application will start on `http://localhost:3000`

### Production Mode

```bash
npm run build
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

## 📊 Database Management

### Generate Database Schema

```bash
npm run db:generate
```

### Run Migrations

```bash
npm run db:migrate
```

### Generate TypeScript Types

```bash
npm run db:types
```

### Run All Database Commands

```bash
npm run db:all
```

### Open Drizzle Studio

```bash
npm run db:studio
```

## 🧪 Testing

### Run Unit Tests

```bash
npm run test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run E2E Tests

```bash
npm run test:e2e
```

### Generate Coverage Report

```bash
npm run test:cov
```

### Health Check

- `GET /` - Application health check

## 🏗️ Project Structure

```
src/
├── app.controller.ts       # Main application controller
├── app.module.ts          # Root application module
├── app.service.ts         # Main application service
├── main.ts               # Application entry point
├── database/             # Database configuration and schema
│   ├── database.module.ts
│   ├── generated-types.ts
│   ├── drizzle/          # Migration files
│   └── schema/           # Database schema definitions
├──
```

## 🔧 Development Scripts

- `npm run build` - Build the application
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint
- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
