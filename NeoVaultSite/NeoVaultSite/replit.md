# NeoVault - Secure File Management System

## Overview

NeoVault is a modern, secure file management system built with a full-stack TypeScript architecture. The application provides a futuristic interface for users to upload, organize, and download files through a category-based system. It features admin authentication through Replit's OIDC system, real-time file management capabilities, and a sleek dark-themed UI with animated components.

The system is designed as a single-page application with protected routes, where authenticated users can access the file management features while unauthenticated users see documentation and marketing content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing with protected route handling
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **Styling**: Custom dark theme with neon accent colors, animated particle backgrounds, and glass morphism effects
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **File Uploads**: React Dropzone for drag-and-drop file upload functionality

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Development**: tsx for TypeScript execution and hot reloading
- **File Handling**: Multer middleware for multipart file uploads with size limits and type validation
- **Session Management**: Express sessions with PostgreSQL storage for persistent login states
- **Error Handling**: Centralized error middleware with structured error responses

### Authentication System
- **Provider**: Replit OIDC (OpenID Connect) for secure authentication
- **Strategy**: Passport.js with OpenID Connect strategy
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Automatic user profile creation and updates from OIDC claims
- **Route Protection**: Middleware-based authentication checks for API endpoints

### Database Architecture
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database queries and schema management
- **Schema**: Structured with separate tables for users, categories, files, and sessions
- **Migrations**: Drizzle Kit for database schema migrations and management
- **Connection**: Connection pooling with @neondatabase/serverless for optimal performance

### File Management System
- **Storage**: Local filesystem storage in uploads directory
- **Organization**: Category-based file organization with slugified URLs
- **File Types**: Support for documents, images, videos, archives, and executables
- **Size Limits**: 100MB maximum file size with configurable limits
- **Validation**: MIME type checking and file extension validation for security

### API Structure
- **REST Endpoints**: 
  - `/api/auth/*` - Authentication and user management
  - `/api/categories` - Category CRUD operations
  - `/api/files` - File upload, download, and management
- **Response Format**: Consistent JSON responses with error handling
- **Request Validation**: Zod schemas for request body validation
- **File Serving**: Static file serving with proper headers for downloads

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for state management
- **Build Tools**: Vite with React plugin, TypeScript compiler, ESBuild for production builds
- **Routing**: Wouter for lightweight client-side routing

### UI and Styling
- **Component Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with custom configuration, PostCSS for processing
- **Animations**: Framer Motion for smooth animations and transitions
- **Icons**: Lucide React for consistent iconography

### Backend Infrastructure
- **Server Framework**: Express.js with TypeScript support
- **Database**: PostgreSQL via Neon with Drizzle ORM
- **Authentication**: Passport.js with OpenID Connect strategy
- **File Handling**: Multer for multipart uploads
- **Session Management**: Express sessions with PostgreSQL store

### Development Tools
- **Replit Integration**: Vite plugins for error overlay and development features
- **Type Safety**: Zod for runtime validation, TypeScript for compile-time checking
- **Code Quality**: ESLint configuration, TypeScript strict mode

### External Services
- **Database Hosting**: Neon PostgreSQL for serverless database
- **Authentication Provider**: Replit OIDC for secure user authentication
- **Font Loading**: Google Fonts for typography (Inter, JetBrains Mono)
- **Development Environment**: Replit for cloud-based development